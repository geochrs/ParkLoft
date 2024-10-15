import express from 'express';
import sequelize from './config/config.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
  console.log('Database synced');
});

app.use(authRoutes);

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
