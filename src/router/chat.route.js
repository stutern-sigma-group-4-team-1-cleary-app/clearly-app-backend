import { getInforForChatScreen } from "../controller/chat.controller.js";

import { tryCatch } from "../utils/tryCatchHandler.js";

import express from "express";

const chatRouter = express.Router();

chatRouter.post("/chats", tryCatch(getInforForChatScreen));

export default chatRouter;
