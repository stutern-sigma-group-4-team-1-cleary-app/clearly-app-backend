import Message from "../model/message.model.js";

import User from "../model/user.model.js";

export const getInforForChatScreen = async (req, res) => {
  const { from, to } = req.body;
  // const foundUser = await User.findOne({ phoneNumber: from });
  // const foundAuser = await User.findOne({ phoneNumber: to });
  const foundChats = await Message.find({
    closedMessageBewteen: `${from}${to}`,
  }).sort({ time: 1 });
  res.status(200).json({
    success: true,
    message: "User chat screen successfully loaded",
    data: foundChats,
  });
};
