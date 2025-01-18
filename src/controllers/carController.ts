import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Car from '../models/carModel'; 

export const createCar = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      return 
    }

    const { type, plate, model, seats, mileage, year, carType } = req.body;

    // Optional: Handle file upload (car image)
    // const image = req.file ? req.file.path : null;

    const newCar = await Car.create({
      type,
      plate,
      model,
      seats,
      mileage,
      year,
      carType,
    //   image,
    });

    res.status(201).json({
      message: "Car created successfully",
      car: {
        id: newCar._id,
        type: newCar.type,
        plate: newCar.plate,
        model: newCar.model,
        seats: newCar.seats,
        mileage: newCar.mileage,
        year: newCar.year,
        carType: newCar.carType,
        // image: newCar.image,
      },
    });
  } catch (error) {
    console.error("Car creation error:", error);
    res.status(500).json({ message: "Error creating car" });
  }
};

export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.status(200).json({ cars });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Error fetching cars" });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId);

    if (!car) {
        res.status(404).json({ message: "Car not found" });
      return 
    }

    res.status(200).json({ car });
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ message: "Error fetching car" });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    const { type, plate, model, seats, mileage, year, carType } = req.body;

    // Optional: Handle file upload (new car image)
    // const image = req.file ? req.file.path : undefined;

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { type, plate, model, seats, mileage, year, carType },
      { new: true } // Return updated car
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
    res.status(500).json({ message: "Error updating car" });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
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
    res.status(500).json({ message: "Error deleting car" });
  }
};
