import express from "express";
// import { userAuthMiddleWare } from "../middlewares/auth.middleware.js";
import { tryCatch } from "../utils/tryCatchHandler.js";
import { getHomepageContent } from "../controller/homepage.controller.js";

const router = express.Router();

// Homepage Content Route
router.get("/", tryCatch(getHomepageContent));


export { router };
