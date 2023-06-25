import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema({
  closedMessageBewteen: String,
  parentMessage: {
    isParent: {
      type: Boolean,
      default: true,
    },
    messageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    time: Date,
  },
});

const Message = model("Message", messageSchema);

export default Message;
