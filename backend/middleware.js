import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

let tokenStore = {};

export const authenticateToken = (req, res, next) => {
  const public_id = req.cookies['public_id'];

  if (!public_id || !tokenStore[public_id]) {
    return res
      .status(401)
      .json({ message: 'Access denied. No active session.' });
  }

  jwt.verify(tokenStore[public_id], process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();
  });
};
