import express from 'express';
import sequelize from './config/config.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PATCH,DELETE',
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

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
