import { Request, Response } from 'express';

import { User } from '../model';
import { checkAuth, getUser, loginUser, logoutUser, registerUser } from './user.controller';

jest.mock('../model');

describe('User Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe('registerUser', () => {
    test('registers a new user', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
      const newUserSaveMock = jest.fn().mockResolvedValueOnce(undefined);
      const newUser = { save: newUserSaveMock };

      jest.spyOn(User, 'create').mockResolvedValueOnce(newUser as any);

      req.body = {
        fullName: 'Some Guy',
        email: 'someguy@gmail.com',
        password: 'hardPassword',
      };

      await registerUser(req as Request, res as Response);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'someguy@gmail.com' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully.' });
    });

    test('returns error if user already exists', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce({});

      req.body = {
        email: 'someguy@gmail.com',
      };

      await registerUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User with this email already exists.' });
    });

    test('returns internal server error on exception', async () => {
      req.body = {
        fullName: 'Some Guy',
        email: 'someguy@gmail.com',
        password: 'hardPassword',
      };
      jest.spyOn(User, 'findOne').mockRejectedValueOnce(new Error('Database error'));

      await registerUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });
  });

  describe('getUser', () => {
    test('returns user data if authenticated', async () => {
      req.user = { fullName: 'Some Guy', email: 'someguy@gmail.com', id: 'user-id' };

      await getUser(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({
        id: 'user-id',
        fullName: 'Some Guy',
        email: 'someguy@gmail.com',
      });
    });

    test('returns unauthorized error if not authenticated', async () => {
      await getUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });

  describe('loginUser', () => {
    test('returns success message', async () => {
      await loginUser(req as Request, res as Response);

      expect(res.send).toHaveBeenCalledWith('Login successful');
    });
  });

  describe('logoutUser', () => {
    test('logs out the user successfully', async () => {
      const next = jest.fn();
      const reqLogoutMock = jest.fn().mockImplementationOnce((cb) => cb());
      req.logout = reqLogoutMock;

      await logoutUser(req as Request, res as Response, next);

      expect(reqLogoutMock).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith('Logout successful');
      expect(next).not.toHaveBeenCalled();
    });

    test('calls next with error if logout fails', async () => {
      const next = jest.fn();
      const error = new Error('Logout error');
      const reqLogoutMock = jest.fn().mockImplementationOnce((cb) => cb(error));
      req.logout = reqLogoutMock;

      await logoutUser(req as Request, res as Response, next);

      expect(reqLogoutMock).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(res.send).not.toHaveBeenCalled();
    });
  });

  describe('checkAuth', () => {
    test('returns authentication status', async () => {
      const isAuthenticatedMock = jest.fn().mockReturnValueOnce(true);
      req.isAuthenticated = isAuthenticatedMock;

      await checkAuth(req as Request, res as Response, jest.fn());

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ authenticated: true });
    });
  });
});
