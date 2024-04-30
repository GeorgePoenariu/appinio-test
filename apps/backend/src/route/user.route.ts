import { Router } from 'express';

import passport from 'passport';
import { checkAuth, getUser, loginUser, logoutUser, registerUser } from '../controller';
import {
  handleValidationErrors,
  isAuthenticated,
  validateLoginPayload,
  validateRegisterPayload,
} from '../middleware';

const router = Router();

router.get('/', isAuthenticated, getUser);
router.post('/register', validateRegisterPayload, handleValidationErrors, registerUser);
router.post(
  '/login',
  validateLoginPayload,
  handleValidationErrors,
  passport.authenticate('local'),
  loginUser,
);
router.post('/logout', logoutUser);
router.get('/check-auth', checkAuth);

export const userRouter: Router = router;
