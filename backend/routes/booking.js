import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';

import Booking from '../models/Booking.js';
import Slot from '../models/Slot.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.get('/bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userPublicId: req.user.public_id },
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/bookings', authenticateToken, async (req, res) => {
  const { fullName, phone, licensePlate, entryTime, exitTime, location_id } =
    req.body;

  let userPublicId;
  if (req.user) {
    userPublicId = req.user.public_id;
  } else {
    userPublicId = uuidv4();
  }

  try {
    
    const entryTimeInUTC = moment(entryTime).tz('UTC', true).toDate();
    const exitTimeInUTC = moment(exitTime).tz('UTC', true).toDate();

    const availableSlots = await Slot.findAll({
      where: { location_id, is_reserved: false },
    });

    if (!availableSlots.length) {
      return res
        .status(400)
        .json({ message: 'No available slots at this location' });
    }

    const selectedSlot = availableSlots[0];

    const newBooking = await Booking.create({
      ticketId: uuidv4(),
      userPublicId,
      licensePlate,
      slot_id: selectedSlot.slot_id,
      location_id,
      entryTime: entryTimeInUTC,
      exitTime: exitTimeInUTC,
      fullName,
      phone,
    });

    await selectedSlot.update({ is_reserved: true });

    res.status(201).json({ message: 'Booking created' });
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
