import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Car from "../models/carModel";

// Create a new car
export const createCar = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return 
    }

    // Destructure fields from request body
    const { type, plate, modelName, seats, mileage, year, carType } = req.body;

    // Check if the car with the same plate already exists
    const existingCar = await Car.findOne({ plate });
    if (existingCar) {
      res.status(409).json({ message: 'Car with this plate already exists' });
    }
      return 

    // Create a new car
    const newCar = new Car({
      type,
      plate,
      modelName,
      seats,
      mileage,
      year,
      carType,
    });

    await newCar.save(); // Save the new car to the database

    // Send success response
    res.status(201).json({
      message: 'Car created successfully',
      car: newCar,
    });
  } catch (error:any) {
    console.error('Car creation error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
// Get all cars
export const getCars = async (_req: Request, res: Response) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 }); // Sort by most recently created
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a car by ID
export const getCarById = async (req: Request, res: Response) => {
  try {
    const { id: carId } = req.params;

    // Validate ID format
    if (!carId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid car ID format" });
      return 
    }

    const car = await Car.findById(carId);
    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return 

    }

    res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a car
export const updateCar = async (req: Request, res: Response) => {
  try {
    const { id: carId } = req.params;
    const { type, plate, modelName, seats, mileage, year, carType } = req.body;

    // Validate ID format
    if (!carId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid car ID format" });
      return 
    }

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { type, plate, modelName, seats, mileage, year, carType },
      { new: true, runValidators: true } // Return updated car and apply validations
    );

    if (!updatedCar) {
      res.status(404).json({ message: "Car not found" });
      return 
    }

    res.status(200).json({
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a car
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const { id: carId } = req.params;

    // Validate ID format
    if (!carId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid car ID format" });
      return 
    }

    const deletedCar = await Car.findByIdAndDelete(carId);
    if (!deletedCar) {
      res.status(404).json({ message: "Car not found" });
      return 
    }

    res.status(200).json({
      message: "Car deleted successfully",
      car: deletedCar,
    });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
