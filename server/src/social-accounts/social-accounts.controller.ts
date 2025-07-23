import { Request, Response } from 'express';
import * as socialAccountsService from './social-accounts.service';

export const getSocialAccounts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const accounts = await socialAccountsService.getSocialAccountsByUserId(userId);
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching social accounts' });
  }
};
