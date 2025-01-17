import express from 'express';
import { auth, isAdmin } from '../middleware/auth';
import { 
  getAllUsers,
  // getUserById,
  // updateUserRole,
  // deleteUser,
  // getDashboardStats,
  // manageOrders
} from '../controllers/admin.controller';

const router = express.Router();

// Protected admin routes
router.use(auth, isAdmin);

router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);
// router.patch('/users/:id/role', updateUserRole);
// router.delete('/users/:id', deleteUser);
// router.get('/dashboard/stats', getDashboardStats);
// router.get('/orders', manageOrders);

export default router;
