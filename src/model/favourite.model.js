import { Schema, model } from "mongoose";

const favouriteSchema = new Schema({
  isAudio: Boolean,
  url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Favourite = model("Favourite", favouriteSchema);
