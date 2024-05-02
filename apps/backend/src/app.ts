import * as bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import session from 'express-session';
import passport from 'passport';

import { configurePassport, connectDB } from './core';
import { appRouter } from './route';

const app: Application = express();

dotenv.config();

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);
app.options('*', cors());
app.use(bodyParser.json());

connectDB();

app.use(
  session({
    secret: process.env.PASSPORT_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: false,
      path: '/',
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/api', appRouter);

export default app;
