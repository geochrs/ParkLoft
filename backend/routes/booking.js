import express from 'express';

import Booking from '../models/Booking.js';
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

export default router;
