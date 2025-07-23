import { Router } from 'express';
import * as postsController from './posts.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticateToken, postsController.createPost);
router.get('/', authenticateToken, postsController.getPosts);

export default router;
