import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import User from './User.js';

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
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
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

Booking.belongsTo(User, {
  foreignKey: 'userPublicId',
  targetKey: 'public_id',
  onDelete: 'CASCADE',
});
User.hasMany(Booking, { foreignKey: 'userPublicId', sourceKey: 'public_id' });

export default Booking;
