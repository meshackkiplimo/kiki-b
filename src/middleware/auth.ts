import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { body,  } from "express-validator";

const JWT_SECRET = process.env.JWT_SECRET || "weri";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// export const validateSignup = [
//   body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
//   body("password").isLength({ min: 6 }).withMessage("Password too short"),
//   body("name").trim().notEmpty().withMessage("Name is required")
// ];

export const validateLogin = [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty()
];

export const validateCheckoutRequestId = (req: Request, res: Response, next: NextFunction) => {
  const { CheckoutRequestID } = req.body;
  
  if (!CheckoutRequestID || typeof CheckoutRequestID !== "string" || !CheckoutRequestID.trim()) {
    return res.status(400).json({ error: "Valid CheckoutRequestID is required" });
  }
  
  next();
};