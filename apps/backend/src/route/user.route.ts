import { Router } from "express";

import passport from "passport";
import {
  checkIfUserIsAuthenticated,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller";
import { isAuthenticated } from "../middleware/is-authenticated.middleware";
import {
  handleValidationErrors,
  validateLoginPayload,
  validateRegisterPayload,
} from "../middleware/validator.middleware";

const router = Router();

router.get("/", getUser);
router.post(
  "/register",
  validateRegisterPayload,
  handleValidationErrors,
  registerUser
);
router.post(
  "/login",
  validateLoginPayload,
  handleValidationErrors,
  passport.authenticate("local"),
  loginUser
);
router.post("/logout", logoutUser);
router.post("/protected", isAuthenticated, checkIfUserIsAuthenticated);

export const userRouter: Router = router;
