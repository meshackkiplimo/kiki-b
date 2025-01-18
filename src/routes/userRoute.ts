import express from "express";
import { login, signup } from "../controllers/userController";
// import { validateLogin } from "../middleware/authMiddleware";
// import rateLimit from "express-rate-limit";

const router = express.Router();

// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // 5 attempts per window
//   message: "Too many login attempts. Please try again later."
// });

router.post("/signup", signup);
router.post("/login",   login);

export default router;