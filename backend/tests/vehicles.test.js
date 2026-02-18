import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { User, Vehicle } from '../models/index.js';
import sequelize from '../config/config.js';
import jwt from 'jsonwebtoken';

let token;
let userPublicId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create a test user
  const user = await User.create({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
    public_id: 'test-user-id',
  });

  userPublicId = user.public_id;

  // Generate JWT token
  token = jwt.sign(
    { public_id: user.public_id, email: user.email },
    process.env.JWT_SECRET || 'testsecret',
  );
});

afterAll(async () => {
  await sequelize.close();
});

describe('Vehicle Routes', () => {
  let vehicleId;

  it('should add a new vehicle', async () => {
    const res = await request(app)
      .post('/vehicles')
      .set('Cookie', [`auth_token=${token}`])
      .send({ licensePlate: 'ABC1234' });

    expect(res.status).toBe(201);
    expect(res.body.licensePlate).toBe('ABC1234');
    vehicleId = res.body.vehicle_id;
  });

  it('should get all vehicles for user', async () => {
    const res = await request(app)
      .get('/vehicles')
      .set('Cookie', [`auth_token=${token}`]);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].licensePlate).toBe('ABC1234');
  });

  it('should update a vehicle', async () => {
    const res = await request(app)
      .put(`/vehicles/${vehicleId}`)
      .set('Cookie', [`auth_token=${token}`])
      .send({ licensePlate: 'XYZ5678' });

    expect(res.status).toBe(200);
    expect(res.body.licensePlate).toBe('XYZ5678');
  });

  it('should delete a vehicle', async () => {
    const res = await request(app)
      .delete(`/vehicles/${vehicleId}`)
      .set('Cookie', [`auth_token=${token}`]);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Vehicle deleted successfully');
  });

  it('should return 404 for deleted vehicle', async () => {
    const res = await request(app)
      .put(`/vehicles/${vehicleId}`)
      .set('Cookie', [`auth_token=${token}`])
      .send({ licensePlate: 'NEW9999' });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Vehicle not found');
  });
});
