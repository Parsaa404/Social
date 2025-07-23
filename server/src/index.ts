import express from 'express';
import cors from 'cors';
import authRouter from './auth/auth.router';
import connectRouter from './connect/connect.router';
import postsRouter from './posts/posts.router';
import passport from './config/passport';
import session from 'express-session';
import './scheduler/scheduler'; // Start the scheduler

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
// No app.use(passport.session()) as we handle auth via JWT

app.use('/api/auth', authRouter);
app.use('/api/connect', connectRouter);
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
