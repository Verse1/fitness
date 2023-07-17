import mongoose from "mongoose";
const { Schema } = mongoose;
import Exercise from "./exerciseSchema";

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  notes: String,
  exercises: [Exercise.schema],
});

export default mongoose.model("Workout", workoutSchema);
