import express from "express";
import UserController from "../controller/user.controller.js";
import { tryCatch } from "../utils/tryCatchHandler.js";
// import { userAuthMiddleWare } from "../middlewares/auth.middleware.js";

// User router
const router = new express.Router();

// User Creation Route
router.post("/create", tryCatch(UserController.createUser));
router.post("/login", tryCatch(UserController.loginUser));

//Exporting the User Router
export { router };
