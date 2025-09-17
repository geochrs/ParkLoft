import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import Slot from './Slot.js';
import Location from './Location.js';
import { Vehicle } from '../models/index.js';

const Booking = sequelize.define(
  'Booking',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ticketId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Vehicle,
        key: 'vehicle_id',
      },
      onDelete: 'SET NULL',
    },
    slot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Slot,
        key: 'slot_id',
      },
      onDelete: 'CASCADE',
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Location,
        key: 'location_id',
      },
      onDelete: 'CASCADE',
    },
    userPublicId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    entryTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    exitTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'bookings',
    timestamps: false,
  }
);

export default Booking;
