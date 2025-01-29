import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  type: { type: String, required: true },
  plate: { type: String, required: true }
});

const Car = mongoose.model("Car", carSchema);
export default Car;
