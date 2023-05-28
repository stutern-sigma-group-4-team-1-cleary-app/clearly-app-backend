import express from "express";
import ForgotController, {
  emailForPassword,
  codeResetVerification,
  passwordReset,
} from "../controller/forgot.controller.js";
import { userAuthMiddleWare } from "../middlewares/auth.middleware";
import { tryCatch } from "../utils/tryCatchHandler.js";

const passwordRouter = express.Router();

passwordRouter.post(
  "/email",
  userAuthMiddleWare,
  tryCatch(ForgotController.emailForPassword)
);
passwordRouter.post(
  "/code",
  userAuthMiddleWare,
  tryCatch(ForgotController.codeResetVerification)
);
passwordRouter.post(
  "/changepassword",
  userAuthMiddleWare,
  tryCatch(ForgotController.passwordReset)
);

export { passwordRouter };
