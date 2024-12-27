import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';


dotenv.config();
const caCertificate = fs.readFileSync(process.env.CA, 'utf8');

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      ca: caCertificate,
      rejectUnauthorized: true,
    },
  },
  logging: false,
});

export default sequelize;
