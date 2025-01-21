import { Schema, model, Document } from "mongoose";

// Define the Car interface
interface Car extends Document {
  type: string; // Sedan, SUV, etc.
  plate: string; // License plate
  modelName: string; // Car model name
  seats: number; // Number of seats
  mileage: number; // Mileage in kilometers
  year: number; // Manufacturing year
  carType: string; // Fuel type, e.g., petrol, diesel, etc.
  // image?: string ; 
}

// Define the schema
const carSchema = new Schema<Car>(
  {
    type: {
      type: String,
      required: [true, "Car type is required"],
      enum: ["Sedan", "SUV", "Truck", "Hatchback", "Van"], // Add categories if needed
    },
    plate: {
      type: String,
      required: [true, "License plate is required"],
      unique: true, // Ensure license plates are unique
    },
    modelName: {
      type: String,
      required: [true, "Model name is required"],
    },
    seats: {
      type: Number,
      required: [true, "Number of seats is required"],
      min: [1, "Car must have at least 1 seat"],
    },
    mileage: {
      type: Number,
      required: [true, "Mileage is required"],
      min: [0, "Mileage cannot be negative"],
    },
    year: {
      type: Number,
      required: [true, "Manufacturing year is required"],
      validate: {
        validator: (value: number) =>
          value >= 1886 && value <= new Date().getFullYear(),
        message: "Year must be between 1886 and the current year.",
      },
    },
    carType: {
      type: String,
      required: [true, "Car type (fuel) is required"],
    },
    // image: {
    //   type: String,
    //   default: null, // Optional image field
    // },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Add an index to frequently queried fields for better performance
carSchema.index({ type: 1, year: -1 });

// Static method to find cars by type
carSchema.statics.findByType = async function (type: string) {
  return this.find({ type });
};

// Static method to find cars by year range
carSchema.statics.findByYearRange = async function (startYear: number, endYear: number) {
  return this.find({ year: { $gte: startYear, $lte: endYear } });
};

// Create and export the model
const CarModel = model<Car>("Car", carSchema);

export default CarModel;
