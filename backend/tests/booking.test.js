import request from 'supertest';
import { describe, beforeAll, beforeEach, afterAll, it, expect } from 'vitest';
import app from '../app.js';
import sequelize from '../config/config.js';
import { Location, Slot } from '../models/index.js';

describe('Booking Routes', () => {
  let token;
  let location;

  const validBookingPayload = (location_id) => ({
    fullName: 'John Doe',
    phone: '1234567890',
    licensePlate: 'ABC1234',
    vehicle_id: null,
    entryTime: new Date(),
    exitTime: new Date(Date.now() + 3600000), // +1 hour
    location_id,
  });

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Create and login user
    await request(app).post('/signup').send({
      username: 'bookinguser',
      email: 'booking@test.com',
      password: 'TestPass123',
    });

    const loginRes = await request(app).post('/login').send({
      email: 'booking@test.com',
      password: 'TestPass123',
    });

    token = loginRes.headers['set-cookie'];
  });

  beforeEach(async () => {
    // Clean DB tables related to booking
    await Slot.destroy({ where: {} });
    await Location.destroy({ where: {} });

    // Create a fresh location
    location = await Location.create({
      name: 'Main Lot',
      address: '123 Test Street',
    });

    // Create an available slot
    await Slot.create({
      location_id: location.location_id,
      slot_number: 'A1',
      is_reserved: false,
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  // ✅ Successful booking
  it('should create booking successfully', async () => {
    const res = await request(app)
      .post('/bookings')
      .set('Cookie', token)
      .send(validBookingPayload(location.location_id));

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Booking created successfully!');
    expect(res.body.booking.ticketId).toBeDefined();
  });

  // ❌ No available slots
  it('should fail if no slots available', async () => {
    // Reserve all slots first
    await Slot.update({ is_reserved: true }, { where: {} });

    const res = await request(app)
      .post('/bookings')
      .set('Cookie', token)
      .send(validBookingPayload(location.location_id));

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('No available slots at this location');
  });

  // ❌ Validation errors
  it('should fail with validation errors', async () => {
    const res = await request(app)
      .post('/bookings')
      .set('Cookie', token)
      .send({
        fullName: '', // invalid
        phone: '', // invalid
        licensePlate: '', // invalid
        vehicle_id: null,
        entryTime: new Date(),
        exitTime: new Date(Date.now() + 3600000),
        location_id: location.location_id,
      });

    expect(res.status).toBe(422);
    expect(res.body.message).toBeDefined();
  });

  it('should allow guest booking without login', async () => {
    const res = await request(app)
      .post('/bookings')
      .send(validBookingPayload(location.location_id));

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Booking created successfully!');
    expect(res.body.booking.ticketId).toBeDefined();
  });
});
