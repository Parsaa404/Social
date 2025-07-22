import { Request, Response } from 'express';
import * as authService from './auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.register({ email, password, name });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
