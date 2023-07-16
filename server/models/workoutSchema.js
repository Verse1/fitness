import mongoose from "mongoose";
const { Schema } = mongoose;

const workoutSchema = new Schema({
  workoutName: {
    type: String,
    required: true,
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "exerciseSchema",
    },
  ],
});

export default mongoose.model("Workout", workoutSchema);
