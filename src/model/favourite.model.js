import { Schema, model } from "mongoose";

const favouriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  favourite: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        ref: "Sentence",
      },
    },
  ],
});

export const Favourite = model("Favourite", favouriteSchema);
