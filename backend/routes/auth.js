import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import {
  validateSignupInput,
  validateLoginInput,
} from '../utils/validation.js';

dotenv.config();

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const errors = validateSignupInput(username, email, password);
  if (errors.length > 0) {
    return res.status(422).json({ message: errors });
  }

  try {
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(422).json({ message: 'Username already taken.' });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(422).json({ message: 'Email already registered.' });
    }

    const newUser = await User.create({ username, email, password });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User created', token });
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

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
