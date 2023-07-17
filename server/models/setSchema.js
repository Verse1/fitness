import mongoose from "mongoose";
const { Schema } = mongoose;

const setSchema = new Schema({
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Set", setSchema);
