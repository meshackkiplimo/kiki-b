import { Schema, model, Document } from "mongoose";

interface Car extends Document {
  type: string;
  plate: string;
  model: string;
  seats: number;
  mileage: number;
  year: number;
  carType: string;
//   image: string | null; // Optional image field
}

const carSchema = new Schema<Car>({
  type: {
    type: String,
    required: true,
  },
  plate: {
    type: String,
    required: true,
    unique: true, // Make plate number unique
  },
  model: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
//   image: {
//     type: String, // URL or file path to car image
//     default: null,
//   },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

const CarModel = model<Car>("Car", carSchema);

export default CarModel;
