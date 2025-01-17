import express from 'express';
import { auth } from '../middleware/auth';
import {
  register,
  login,
  getProfile,
//   updateProfile,
//   getOrders,
//   createOrder,
//   addToCart,
//   removeFromCart,
//   getCart
} from '../controllers/userController';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected user routes
// router.use(auth);
router.get('/profile', getProfile);
// router.patch('/profile', updateProfile);
// router.get('/orders', getOrders);
// router.post('/orders', createOrder);
// router.get('/cart', getCart);
// router.post('/cart', addToCart);
// router.delete('/cart/:productId', removeFromCart);

export default router;