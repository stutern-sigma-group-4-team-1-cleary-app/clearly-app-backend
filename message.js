import { io } from "./app/io";
import Message from "./model/message.model.";
import User from "./model/user.model";

io.on("connection", (socket) => {
  socket.on("private-chat", (data) => {
    socket.join(data);
    socket.on("message", async (msg) => {
      io.sockets.in(data).emit("chat message", msg);
      const foundAUser = await User.findeOne({ fullName: msg.from });
      const foundUser = await User.findOne({ fullName: msg.to });
      await Message.create({
        isParent: false,
        Message: msg.parent,
        from: foundAUser._id,
        to: foundUser._id,
        message: msg.text,
        time: Date.now(),
      });
    });
  });
});
