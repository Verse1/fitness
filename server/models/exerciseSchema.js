import mongoose from "mongoose";
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  exerciseName: {
    type: String,
    required: true,
  },
  sets: [
    {
      type: Schema.Types.ObjectId,
      ref: "set",
    },
  ],
});

export default mongoose.model("Exercise", exerciseSchema);
