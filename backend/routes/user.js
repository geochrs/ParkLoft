import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: ['username', 'email', 'createdAt'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving profile' });
  }
});

export default router;
