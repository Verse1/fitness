import mongoose from "mongoose";
const { Schema } = mongoose;
import Set from "./setSchema";

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sets: [Set.schema],
});

export default mongoose.model("Exercise", exerciseSchema);
