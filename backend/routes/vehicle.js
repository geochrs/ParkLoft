import express from 'express';
import { Vehicle } from '../models/index.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

// Get all vehicles of the logged-in user
router.get('/vehicles', authenticateToken, async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: { user_id: req.user.public_id },
    });
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
});

// Add a new vehicle
router.post('/vehicles', authenticateToken, async (req, res) => {
  const { licensePlate } = req.body;
  try {
    const vehicle = await Vehicle.create({
      licensePlate,
      user_id: req.user.public_id,
    });
    res.status(201).json(vehicle);
  } catch (err) {
    console.error('Sequelize error:', err);
    res
      .status(500)
      .json({ message: 'Failed to add vehicle', error: err.message });
  }
});

// Update a vehicle
router.put('/vehicles/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { licensePlate } = req.body;

  try {
    const vehicle = await Vehicle.findOne({
      where: { vehicle_id: id, user_id: req.user.public_id },
    });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    vehicle.licensePlate = licensePlate ?? vehicle.licensePlate;
    await vehicle.save();

    res.status(200).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update vehicle' });
  }
});

// Delete a vehicle
router.delete('/vehicles/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findOne({
      where: { vehicle_id: id, user_id: req.user.public_id },
    });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    await vehicle.destroy();
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete vehicle' });
  }
});

export default router;
