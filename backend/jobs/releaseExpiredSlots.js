import { Op, Sequelize } from 'sequelize';
import Slot from '../models/Slot.js';
import Booking from '../models/Booking.js';

export const releaseExpiredSlots = async () => {
  try {
    const now = new Date();

    await Slot.update(
      { is_reserved: false },
      {
        where: {
          is_reserved: true,
          slot_id: {
            [Op.in]: Sequelize.literal(`(
              SELECT b.slot_id FROM bookings b
              WHERE b.exitTime < NOW()
              AND NOT EXISTS (
                SELECT 1 FROM bookings b2
                WHERE b2.slot_id = b.slot_id
                  AND b2.entryTime > NOW()
              )
            )`),
          },
        },
      }
    );

    console.log(`[${now.toISOString()}] Expired slots released successfully.`);
  } catch (error) {
    console.error('Error releasing expired slots:', error);
  }
};
