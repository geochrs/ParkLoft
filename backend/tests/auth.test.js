import request from 'supertest';
import app from '../app.js';
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import sequelize from '../config/config.js';

describe('Auth Routes', () => {
  // Before all tests: just ensure connection works
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // After all tests: close connection
  afterAll(async () => {
    await sequelize.close();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/signup').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'TestPass123',
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User created');
  });

  it('should not allow duplicate registration', async () => {
    const res = await request(app).post('/signup').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'TestPass123',
    });

    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Username or Email already registered.');
  });

  it('should login successfully', async () => {
    const res = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'TestPass123',
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful');
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'WrongPass',
    });

    expect(res.status).toBe(422);
    expect(res.body.message).toBe('Invalid email or password');
  });

  it('should logout successfully', async () => {
    const res = await request(app).post('/logout');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Logout successful');
  });
});
