import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  plate: { type: String, required: true },
  model:{type:String,required:true},
  color:{type:String,required:true},
  milage:{type:Number,required:true},
  price:{type:Number,required:true},
  capacity:{type:Number,required:true},
  fuel:{type:String,required:true},
  year:{type:Number,required:true},
  imageUrl:{type:String,required:false}

});

const Car = mongoose.model("Car", carSchema);
export default Car;
