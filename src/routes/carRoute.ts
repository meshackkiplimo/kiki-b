import express from 'express';
import { createCar, getCars, getCarById, updateCar, deleteCar } from '../controllers/carController';

const router = express.Router();

router.post("/create", createCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;
