import {
  addToFavourite,
  getFavourites,
  removeFromFavourite,
} from "../controller/favourite.controller.js";
import { userAuthMiddleWare } from "../middlewares/auth.middleware.js";

import express from "express";
import { tryCatch } from "../utils/tryCatchHandler.js";

const favoriteRouter = express.Router();

favoriteRouter.post("/create", userAuthMiddleWare, addToFavourite);
favoriteRouter.get("/", userAuthMiddleWare, getFavourites);
favoriteRouter.patch("/:id", userAuthMiddleWare, removeFromFavourite);

export default favoriteRouter;
