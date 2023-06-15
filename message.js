import { io } from "./app/io";
import Message from "./model/message.model.";
import User from "./model/user.model";

io.on("connection", (socket) => {
  socket.on("private-chat", (data) => {
    socket.join(data);
    socket.on("message", async (msg) => {
      io.sockets.in(data).emit("chat message", msg);
      const foundAUser = await User.findeOne({ phoneNumber: msg.from });
      const foundUser = await User.findOne({ phoneNumber: msg.to });
      if (msg.isParent == false) {
        await Message.create({
          closedMessageBetween: data,
          isParent: false,
          messageId: msg.parent,
          from: foundAUser._id,
          to: foundUser._id,
          message: msg.text,
          time: Date.now(),
        });
      } else {
        await Message.create({
          closedMessageBetween: data,
          messageId: foundAUser._id,
          from: foundAUser._id,
          to: foundUser._id,
          message: msg.text,
          time: Date.now(),
        });
      }
    });
  });
});
