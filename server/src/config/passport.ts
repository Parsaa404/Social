import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY!,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
    callbackURL: "/api/connect/twitter/callback"
  },
  async (token, tokenSecret, profile, done) => {
    // Here you would find or create a user and save the social account
    // For now, we'll just return the profile

    // Example of saving the social account:
    /*
    const user = await prisma.user.findUnique({ where: { id: (req.user as any).id } });
    if (user) {
      await prisma.socialAccount.create({
        data: {
          provider: 'twitter',
          providerId: profile.id,
          username: profile.username,
          accessToken: token,
          refreshToken: tokenSecret,
          userId: user.id
        }
      });
    }
    */

    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
