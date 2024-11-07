import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.public_id;

  try {
    const user = await User.findOne({ where: { public_id: userId } });
    console.log(user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile' });
  }
});

export default router;
