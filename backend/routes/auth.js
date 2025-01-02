import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import {
  validateSignupInput,
  validateLoginInput,
} from '../utils/validation.js';
import { authenticateToken } from '../middleware.js';

dotenv.config();

const router = express.Router();
const isProduction = process.env.NODE_ENV === 'production';

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const errors = validateSignupInput(username, email, password);
  if (errors.length > 0) {
    return res.status(422).json({ message: errors });
  }

  try {
    const existingUsername = await User.findOne({ where: { username } });
    const existingEmail = await User.findOne({ where: { email } });

    if (existingUsername || existingEmail) {
      return res
        .status(422)
        .json({ message: 'Username or Email already registered.' });
    }

    const newUser = await User.create({ username, email, password });

    const token = jwt.sign(
      { public_id: newUser.public_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('auth_token', token, {
      httpOnly: isProduction,
      maxAge: 3600 * 1000,
      secure: isProduction,
    });

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const errors = validateLoginInput(email, password);
  if (errors.length > 0) {
    return res.status(422).json({ message: errors });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(422).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { public_id: user.public_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('auth_token', token, {
      httpOnly: isProduction,
      maxAge: 3600 * 1000,
      secure: isProduction,
    });

    res.status(200).json({
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.status(200).json({ message: 'Logout successful' });
});

router.get('/auth-check', authenticateToken, async (req, res) => {
  if (!req.user) {
    return res.status(200).json({ guest: true });
  }

  const user = await User.findOne({ where: { public_id: req.user.public_id } });

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const { password, ...userDetails } = user.toJSON();
  res.status(200).json(userDetails);
});

export default router;
