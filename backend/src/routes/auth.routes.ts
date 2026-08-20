import express from "express";
const router = express.Router();
import { registerUser, loginUser, getMe, updateProfile, changePassword } from '../controllers/auth.controller.js';
import { validate } from "../middleware/validate.js";
import {createUserSchema, loginUserSchema, updateProfileSchema, changePasswordSchema} from "../validators/auth.validator.js"
import authJwt from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";

router.post('/register', authLimiter, validate(createUserSchema), registerUser);

router.post('/login', authLimiter, validate(loginUserSchema), loginUser);

// Protected routes
router.get('/me', authJwt, getMe);
router.put('/update-profile', authJwt, validate(updateProfileSchema), updateProfile);
router.put('/change-password', authJwt, validate(changePasswordSchema), changePassword);



export default router;