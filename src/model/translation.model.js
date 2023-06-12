import { Schema, model } from "mongoose";

const TranslationSchema = new Schema(
  {
    option: {
      type: String,
      required: true,
    },
    originalText: {
      type: String,
      required: true,
    },
    translatedText: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Translation", TranslationSchema);
