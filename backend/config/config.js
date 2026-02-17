import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';

dotenv.config();

let sequelize;
if (process.env.NODE_ENV === 'test') {
  // ✅ Use in-memory SQLite for tests
  sequelize = new Sequelize('sqlite::memory:', {
    logging: false,
  });
} else {
  const caCertificate = process.env.CERTIFICATE_TIDB;
  const formattedCertificate = `-----BEGIN CERTIFICATE-----\n${caCertificate
    .match(/.{1,64}/g)
    .join('\n')}\n-----END CERTIFICATE-----`;

  sequelize = new Sequelize(process.env.DATABASE_URL, {
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
}

export default sequelize;
