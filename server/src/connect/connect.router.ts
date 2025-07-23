import { Router } from 'express';
import passport from '../config/passport';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Redirect the user to Twitter for authentication
// We pass the JWT user object to the session so passport can access it
router.get('/twitter', authenticateToken, (req, res, next) => {
  // Passport's authenticate middleware will run after this.
  // We need to make sure the session is aware of our user from the JWT.
  req.session.user = (req as any).user;
  passport.authenticate('twitter')(req, res, next);
});


// Twitter will redirect the user back to the application at this URL
router.get('/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login', // Redirect to login on failure
    successRedirect: '/dashboard', // Redirect to dashboard on success
    session: false // We are using JWT, not session-based auth for our app
  })
);

// An endpoint to get the user's connected accounts
router.get('/accounts', authenticateToken, async (req, res) => {
    // This is a placeholder for where you'd fetch the accounts
    // from the database for the currently logged-in user.
    res.json([{ id: 'clx...', provider: 'twitter', username: '@testuser' }]);
});


export default router;
