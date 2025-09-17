import User from './User.js';
import Vehicle from './Vehicle.js';
import Booking from './Booking.js';
import Slot from './Slot.js';
import Location from './Location.js';

User.hasMany(Vehicle, {
  foreignKey: 'user_id',
  sourceKey: 'public_id',
  as: 'vehicles',
});
Vehicle.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'public_id',
  as: 'user',
});

Booking.belongsTo(Location, { foreignKey: 'location_id' });
Booking.belongsTo(Slot, {
  foreignKey: 'slot_id',
  onDelete: 'CASCADE',
});
Booking.belongsTo(Vehicle, { foreignKey: 'vehicle_id', onDelete: 'SET NULL' });
Slot.hasMany(Booking, { foreignKey: 'slot_id' });

Slot.belongsTo(Location, {
  foreignKey: 'location_id',
  onDelete: 'CASCADE',
});
Location.hasMany(Slot, { foreignKey: 'location_id' });

export { User, Vehicle, Booking, Slot, Location };