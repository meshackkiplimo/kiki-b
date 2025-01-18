import express from "express";
import { createCar, getCars, getCarById, updateCar, deleteCar } from "../controllers/carController";
// import { upload } from "../middleware/fileUpload"; // If you're using multer for file uploads

const router = express.Router();

// Route to create a new car
router.post("/create", createCar); // Use upload.single() to handle image uploads

// Route to get all cars
router.get("/", getCars);

// Route to get a single car by its ID
router.get("/:id", getCarById);

// Route to update an existing car by its ID
router.put("/:id", upload.single("image"), updateCar);

// Route to delete a car by its ID
router.delete("/:id", deleteCar);

export default router;
