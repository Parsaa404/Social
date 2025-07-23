import { Router } from 'express';
import * as socialAccountsController from './social-accounts.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, socialAccountsController.getSocialAccounts);

export default router;
