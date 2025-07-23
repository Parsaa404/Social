import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { PrismaClient } from '../generated/prisma';
import { Request } from 'express';

const prisma = new PrismaClient();

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY!,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
    callbackURL: "/api/connect/twitter/callback",
    passReqToCallback: true // Pass the request object to the callback
  },
  async (req: Request, token, tokenSecret, profile, done) => {
    try {
      const user = (req.user as any);
      if (!user || !user.userId) {
        return done(new Error('User not authenticated'), null);
      }

      // Check if this social account already exists
      const existingAccount = await prisma.socialAccount.findUnique({
        where: {
          provider_providerId: {
            provider: 'twitter',
            providerId: profile.id,
          }
        }
      });

      if (existingAccount) {
        // Optionally, update the tokens
        await prisma.socialAccount.update({
          where: { id: existingAccount.id },
          data: {
            accessToken: token,
            refreshToken: tokenSecret,
            username: profile.username,
          }
        });
        return done(null, profile);
      }

      // Create a new social account and link it to the user
      await prisma.socialAccount.create({
        data: {
          provider: 'twitter',
          providerId: profile.id,
          username: profile.username,
          accessToken: token,
          refreshToken: tokenSecret,
          userId: user.userId
        }
      });

      return done(null, profile);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Serialize user based on the JWT payload
passport.serializeUser((user: any, done) => {
  // The user object here is the JWT payload from our authenticateToken middleware
  done(null, user);
});

// Deserialize user
passport.deserializeUser((user: any, done) => {
  // We don't need to fetch from DB here if the JWT payload is sufficient
  done(null, user);
});

export default passport;
