import express from 'express';
import {Location, Slot, Booking} from '../models/index.js';

import { authenticateToken } from '../middleware.js';

const router = express.Router();

// router.post('/slots-available', authenticateToken, async (req, res) => {
//   const { entryTime, exitTime } = req.body;
//   try {
//     const locations = await Location.findAll({
//       include: [
//         {
//           model: Slot,
//           attributes: ['slot_id', 'slot_number'],
//           where: {
//             is_reserved: false,
//           },
//           include: [
//             {
//               model: Booking,
//               attributes: [], // We only care about filtering, not fetching bookings
//               where: {
//                 [Op.or]: [
//                   { entryTime: { [Op.gte]: exitTime } }, // Booking starts after requested exit
//                   { exitTime: { [Op.lte]: entryTime } }, // Booking ends before requested entry
//                 ],
//               },
//               required: false, // Include slots without conflicting bookings
//             },
//           ],
//         },
//       ],
//       attributes: ['location_id', 'name', 'address'],
//     });

//     const filteredLocations = locations.filter(
//       (location) => location.Slots.length > 0
//     );

//     res.status(200).json(filteredLocations);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch available slots.' });
//   }
// });

router.get('/slots-available', authenticateToken, async (req, res) => {
  try {
    const locations = await Location.findAll({
      include: [
        {
          model: Slot,
          where: {
            is_reserved: false,
          },
          attributes: ['slot_id', 'slot_number'],
        },
      ],
      attributes: ['location_id', 'name', 'address'],
    });

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch available slots.' });
  }
});

export default router;