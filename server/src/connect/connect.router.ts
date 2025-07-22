import { Router } from 'express';
import passport from '../config/passport';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Redirect the user to Twitter for authentication
router.get('/twitter', authenticateToken, passport.authenticate('twitter'));

// Twitter will redirect the user back to the application at this URL
router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

export default router;
