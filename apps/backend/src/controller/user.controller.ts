import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import { IUser, User } from '../model';

/**
 * @registers the user
 */
export const registerUser = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * @returns the user
 */
export const getUser = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { fullName, email, id } = req.user as IUser;
  res.json({ id, fullName, email });
};

/**
 * @logs in the user
 */
export const loginUser = async (req: Request, res: Response) => res.send('Login successful');

/**
 * @logs out the user
 */
export const logoutUser = async (req: Request, res: Response, next: NextFunction) =>
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send('Logout successful');
  });

/**
 * @checks if the user is authenticated
 */
export const checkAuth = async (req: Request, res: Response, next: NextFunction) =>
  res.status(200).json({ authenticated: req.isAuthenticated() });
