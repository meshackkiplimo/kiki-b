import express from 'express';
import { auth, isAdmin } from '../middleware/auth';
import { 
  getAllUsers,
  // getUserById,
  // updateUserRole,
  // deleteUser,
  // getDashboardStats,
  // manageOrders
} from '../controllers/adminController';

const router = express.Router();

// Middleware to protect all admin routes
// router.use(isAdmin);

// User management routes
router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);
// router.patch('/users/:id/role', updateUserRole);
// router.delete('/users/:id', deleteUser);

// Dashboard and order management routes
// router.get('/dashboard/stats', getDashboardStats);
// router.get('/orders', manageOrders);

export default router;
