import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import { User } from '../models/index.js';

const Vehicle = sequelize.define(
  'Vehicle',
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: User,
        key: 'public_id',
      },
    },
  },
  {
    tableName: 'vehicles',
    timestamps: false,
  }
);

export default Vehicle;
