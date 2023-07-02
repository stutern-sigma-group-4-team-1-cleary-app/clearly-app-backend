// import { userAuthMiddleWare } from "../middlewares/auth.middleware.js";
import { tryCatch } from "../utils/tryCatchHandler.js";

import {
  translateFromSpeech,
  translateFromTextToText,
} from "../controller/translation.controller.js";

import express from "express";

const translateRouter = express.Router();

translateRouter.post("/speech", tryCatch(translateFromSpeech));

translateRouter.post( "/text", tryCatch(translateFromTextToText));

export default translateRouter;
