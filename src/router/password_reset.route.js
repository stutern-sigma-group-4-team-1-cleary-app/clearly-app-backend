import express from "express";
import {
  emailForPassword,
  codeResetVerification,
  passwordReset,
} from "../controller/forgot.controller.js";
import { userAuthMiddleWare } from "../middlewares/auth.middleware.js";
import { tryCatch } from "../utils/tryCatchHandler.js";

const passwordRouter = express.Router();

passwordRouter.post("/email", tryCatch(emailForPassword));
passwordRouter.post("/code", tryCatch(codeResetVerification));
passwordRouter.post("/changepassword", tryCatch(passwordReset));

export { passwordRouter };
