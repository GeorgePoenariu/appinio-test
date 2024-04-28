import * as bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import session from 'express-session';
import passport from 'passport';

import { connectDB } from './core/db';
import { configurePassport } from './core/passport';
import { appRouter } from './route';

const app: Application = express();

dotenv.config();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

connectDB();

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/api', appRouter);

export default app;
