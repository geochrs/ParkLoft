import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import User from './User.js';
import Slot from './Slot.js';

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
    slot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Slot,
        key: 'slot_id',
      },
      onDelete: 'CASCADE',
    },
    userPublicId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: User,
        key: 'public_id',
      },
      onDelete: 'CASCADE',
    },
    entryTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    exitTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'bookings',
  }
);

//Relationships
Booking.belongsTo(User, {
  foreignKey: 'userPublicId',
  targetKey: 'public_id',
  onDelete: 'CASCADE',
});

User.hasMany(Booking, { foreignKey: 'userPublicId', sourceKey: 'public_id' });

Booking.belongsTo(Slot, {
  foreignKey: 'slot_id',
  onDelete: 'CASCADE',
});
Slot.hasMany(Booking, { foreignKey: 'slot_id' });

export default Booking;
