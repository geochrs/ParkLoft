import express from 'express';
import sequelize from './config/config.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import bookingRoutes from './routes/booking.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const frontEndUrl = process.env.NODE_ENV === 'production'
  ? process.env.PRODUCTION_FRONTEND_URL 
  : process.env.DEVELOPMENT_FRONTEND_URL;

const app = express();
app.use(
  cors({
    origin: frontEndUrl,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log('Database synced with new User model.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.use(authRoutes);
app.use(userRoutes);
app.use(bookingRoutes);

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
