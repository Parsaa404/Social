import request from 'supertest';
import express from 'express';
import authRouter from './auth.router';
import * as authService from './auth.service';

// Mock the authService
jest.mock('./auth.service');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('Auth Router', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user and return it', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
      mockedAuthService.register.mockResolvedValue(mockUser as any);

      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: 'password123', name: 'Test User' });

      expect(response.status).toBe(201);
      expect(response.body.user).toEqual(mockUser);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login a user and return user and token', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockToken = 'mock-jwt-token';
      mockedAuthService.login.mockResolvedValue({ user: mockUser as any, token: mockToken });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body.user).toEqual(mockUser);
      expect(response.body.token).toBe(mockToken);
    });
  });
});
