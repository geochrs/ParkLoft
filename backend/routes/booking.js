import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';
import { generateTicketId } from '../utils/generateTicketId.js';

import { Vehicle, Slot, Location, Booking } from '../models/index.js';
import { authenticateToken } from '../middleware.js';
import { validateBookingInput } from '../utils/validation.js';

const router = express.Router();

router.get('/bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userPublicId: req.user.public_id },
      include: {
        model: Location,
        attributes: ['name'],
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/bookings', authenticateToken, async (req, res) => {
  const {
    fullName,
    phone,
    vehicle_id,
    licensePlate,
    entryTime,
    exitTime,
    location_id,
  } = req.body;

  const errors = validateBookingInput(fullName, phone, licensePlate, vehicle_id);
  if (errors.length > 0) {
    return res.status(422).json({ message: errors });
  }

  let userPublicId;
  if (req.user) {
    userPublicId = req.user.public_id;
  } else {
    userPublicId = uuidv4();
  }

  let finalLicensePlate = licensePlate;

  if (vehicle_id) {
    const vehicle = await Vehicle.findOne({
      where: { vehicle_id, user_id: req.user.public_id },
    });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    finalLicensePlate = vehicle.licensePlate;
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
      ticketId: generateTicketId(),
      userPublicId,
      vehicle_id: vehicle_id || null,
      licensePlate: finalLicensePlate,
      slot_id: selectedSlot.slot_id,
      location_id,
      entryTime: entryTimeInUTC,
      exitTime: exitTimeInUTC,
      fullName,
      phone,
    });

    await selectedSlot.update({ is_reserved: true });

    res.status(201).json({
      message: 'Booking created successfully!',
      booking: {
        ticketId: newBooking.ticketId,
        fullName,
        phone,
        entryTime: entryTimeInUTC,
        exitTime: exitTimeInUTC,
      },
    });
  } catch (error) {
    console.error('Booking creation failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
