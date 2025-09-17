import express from 'express';
import { User, Vehicle } from '../models/index.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.public_id;

  try {
    const user = await User.findOne({
      where: { public_id: userId },
      include: [{ model: Vehicle, as: 'vehicles' }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile' });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.public_id;
  const { username, phone, dateOfBirth } = req.body;

  try {
    const user = await User.findOne({ where: { public_id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username ?? user.username;
    user.phone = phone ?? user.phone;
    user.dateOfBirth = dateOfBirth ?? user.dateOfBirth;

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

export default router;
