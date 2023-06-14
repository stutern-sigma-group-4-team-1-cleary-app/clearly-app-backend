import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  from: {
    type: Types.Schema.ObjectId,
    ref: "User",
  },
  to: {
    type: Types.Schema.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  time: Date,
});

const Message = model("Message", messageSchema);

export default Message;
