import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import Location from './Location.js';

const Slot = sequelize.define(
  'Slot',
  {
    slot_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    slot_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_reserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'slots',
    timestamps: false,
  }
);

export default Slot;
