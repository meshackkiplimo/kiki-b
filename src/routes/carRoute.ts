import express, { Router } from 'express';
import { createCar, getCars, getCarById, updateCar, deleteCar } from '../controllers/carController';
import  {upload}  from '../middleware/upload';

const router: Router = express.Router();

// Routes with image upload handling
router.post("/create", upload.single('image'), createCar);
router.put("/:id", upload.single('image'), updateCar);

// Routes without image upload
router.get("/", getCars);
router.get("/:id", getCarById);
router.delete("/:id", deleteCar);

export default router;
