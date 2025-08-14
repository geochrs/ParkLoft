import express from 'express';

import { authenticateToken } from '../middleware.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Location from '../models/Location.js';
import Slot from '../models/Slot.js';
import { generateTicketId } from '../utils/generateTicketId.js';
import { shiftBookingTime, formatBookingTime } from '../utils/timeUtils.js';

const router = express.Router();

async function rebookLast(user, lastBooking) {
  try {
    // Shift times to tomorrow with original hours/minutes
    const newEntryTime = shiftBookingTime(lastBooking.entryTime);
    const newExitTime = shiftBookingTime(lastBooking.exitTime);

    const availableSlots = await Slot.findAll({
      where: { location_id: lastBooking.location_id, is_reserved: false },
    });

    if (!availableSlots.length) {
      return {
        status: 200,
        body: { response: 'No available slots at this location for tomorrow.' },
      };
    }

    const selectedSlot =
      availableSlots.find((s) => s.slot_id === lastBooking.slot_id) ||
      availableSlots[0];

    await selectedSlot.update({ is_reserved: true });

    const newBooking = await Booking.create({
      ticketId: generateTicketId(),
      userPublicId: user.public_id,
      licensePlate: lastBooking.licensePlate,
      slot_id: selectedSlot.slot_id,
      location_id: lastBooking.location_id,
      entryTime: newEntryTime.toDate(),
      exitTime: newExitTime.toDate(),
      fullName: lastBooking.fullName,
      phone: lastBooking.phone,
    });

    return {
      status: 201,
      body: {
        response: `✅ Rebooked your last spot at ${
          lastBooking.Location.name
        } for ${newEntryTime.format(
          'MMMM D, YYYY HH:mm'
        )} to ${newExitTime.format('MMMM D, YYYY HH:mm')}.`,
        booking: newBooking,
      },
    };
  } catch (err) {
    console.error('Rebook Last Error:', err.message);
    return { status: 500, body: { error: 'Failed to rebook last booking.' } };
  }
}

router.post('/api/chat', authenticateToken, async (req, res) => {
  const { messages } = req.body;
  if (!req.user) {
    return res.status(200).json({
      response: 'Please log in to get personalized assistance.',
    });
  }

  try {
    // 1. Fetch user profile
    const user = await User.findOne({
      where: { public_id: req.user.public_id },
    });

    // 2. Fetch past bookings
    const lastBooking = await Booking.findOne({
      where: { userPublicId: user.public_id },
      include: [{ model: Location }],
      order: [['entryTime', 'DESC']],
    });

    //Detect if user wants to repeat last booking
    const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase();

    const repeatPatterns = [
      /book (me|that|the)? last (spot|booking|reservation)/,
      /repeat (my|the)? (last|previous) (booking|reservation|spot)/,
      /(reserve|book).*(same|last|previous)/,
      /again/,
      /same (spot|booking)/,
    ];

    const wantsToRepeat = repeatPatterns.some((pattern) =>
      pattern.test(lastUserMsg)
    );

    if (wantsToRepeat) {
      if (!lastBooking) {
        return res
          .status(200)
          .json({ response: "You don't have any past bookings to repeat." });
      }
      const result = await rebookLast(req.user, lastBooking);
      return res.status(result.status).json(result.body);
    }

    //Normal AI chat flow
    const formattedEntryTime = formatBookingTime(
      lastBooking.entryTime,
      user.timeZone || 'UTC'
    );
    const formattedExitTime = formatBookingTime(
      lastBooking.exitTime,
      user.timeZone || 'UTC'
    );

    const bookingSummaries = lastBooking
      ? [
          `• ${lastBooking.Location.name} from ${formattedEntryTime} to ${formattedExitTime}`,
        ]
      : [];

    // 3. Build prompt
    const systemPrompt = {
      role: 'system',
      content: `You are a parking assistant for logged-in users. The user is ${
        user.username
      }.
They have ${lastBooking ? 1 : 0} booking:
${bookingSummaries.join('\n') || 'No previous bookings.'}`,
    };

    const chatHistory = [systemPrompt, ...messages];

    // Call OpenRouter API
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: chatHistory,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `OpenRouter API error: ${errorData.error || response.statusText}`
      );
    }

    const data = await response.json();
    const aiReply =
      data.choices[0]?.message?.content || 'I could not generate a response.';

    res.status(200).json({ response: aiReply });
  } catch (err) {
    console.error('AI Chat Error:', err.message);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

export default router;
