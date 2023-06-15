import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  closedMessageBewteen: String,
  parentMessage: {
    isParent: {
      type: Boolean,
      deafult: true,
    },
    messageId: {
      type: Types.Schema.ObjectId,
      ref: "Message",
    },
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
  },
});

const Message = model("Message", messageSchema);

export default Message;
