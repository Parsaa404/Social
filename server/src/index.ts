import express from 'express';
import authRouter from './auth/auth.router';
import connectRouter from './connect/connect.router';
import postsRouter from './posts/posts.router';
import passport from './config/passport';
import session from 'express-session';
import './scheduler/scheduler'; // Start the scheduler

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
app.use('/api/connect', connectRouter);
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
