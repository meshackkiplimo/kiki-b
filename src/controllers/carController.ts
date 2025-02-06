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

    const { brand, plate,model,color,milage,price,capacity,fuel,year} = req.body;

    // Check if the car with the same plate already exists
    const existingCar = await Car.findOne({ plate });
    if (existingCar) {
      res.status(409).json({ message: 'Car with this plate already exists' });
      return 
    }

    // Create a new car with all required fields
    const newCar = new Car({
      brand,
      plate,
      model,
      color,
      milage,
      price,
      capacity,
      fuel,
      year,
      
    });

    await newCar.save();
    res.status(201).json({
      message: 'Car created successfully',
      car: newCar,
    });
    console.log("this is the real car")
    console.log({brand, plate})

    return 
  } catch (error: any) {
    console.error('Car creation error:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.keys(error.errors).reduce((acc: any, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {})
      });
      return 
    }
    res.status(500).json({ message: 'Internal server error', error: error.message });
    return 
  }
};

// Get all cars with pagination and filtering
export const getCars = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = (req.query.sort as string) || '-createdAt';
    
    // Build filter object from query parameters
    const filter: any = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.carType) filter.carType = req.query.carType;
    if (req.query.year) filter.year = req.query.year;

    const cars = await Car.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Car.countDocuments(filter);
    res.status(200).json({
      cars,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCars: total
    });

    return 
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal server error" });
    return 
  }
};

// Get a car by ID
export const getCarById = async (req: Request, res: Response) => {
  try {
    const { id: carId } = req.params;

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
    return 
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ message: "Internal server error" });
    return 
  }
};

// Update a car
export const updateCar = async (req: Request, res: Response) => {
  try {
    const { id: carId } = req.params;
    const updates = req.body;

    if (!carId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid car ID format" });
      return 
    }

    // Check if updating plate number and if it already exists
    if (updates.plate) {
      const existingCar = await Car.findOne({ 
        plate: updates.plate,
        _id: { $ne: carId }
      });
      if (existingCar) {
        res.status(409).json({ message: 'Car with this plate already exists' });
        return 
      }
    }

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedCar) {
      res.status(404).json({ message: "Car not found" });
      return 
    }

    res.status(200).json({
      message: "Car updated successfully",
      car: updatedCar,
    });
    return 
  } catch (error: any) {
    console.error("Error updating car:", error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.keys(error.errors).reduce((acc: any, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {})
      });
      return 
    }
    res.status(500).json({ message: "Internal server error" });
    return 
  }
};

// Delete a car
export const deleteCar = async (req: Request, res: Response) => {
  try {
    const { id: carId } = req.params;

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

    return 
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Internal server error" });
    return 
  }
};