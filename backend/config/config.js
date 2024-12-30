import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';

dotenv.config();
const caCertificate = process.env.CERTIFICATE_TIDB;
const formattedCertificate = `-----BEGIN CERTIFICATE-----\n${caCertificate
  .match(/.{1,64}/g)
  .join('\n')}\n-----END CERTIFICATE-----`;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectModule: mysql2,
  dialectOptions: {
    ssl: {
      ca: formattedCertificate,
      rejectUnauthorized: true,
    },
  },
  logging: false,
});

export default sequelize;
