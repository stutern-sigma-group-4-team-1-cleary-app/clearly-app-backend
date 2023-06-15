import Message from "../model/message.model.js";

import User from "../model/user.model.js";

export const getInforForChatScreen = async (req, res) => {
  const { from, to } = req.body;
  const foundUser = await User.findOne({ fullName: from });
  const foundAuser = await User.findOne({ fullName: to });
  const foundChats = await Message.find({
    from: foundUser._id,
    to: foundAuser._id,
  }).sort({ time: 1 });
  res.status(200).json({
    success: true,
    message: "User chat screen successfully loaded",
    data: foundChats,
  });
};
