import {
  addToFavourite,
  getFavourites,
  removeFromFavourite,
} from "../controller/favourite.controller.js";
import { userAuthMiddleWare } from "../middlewares/auth.middleware.js";

import express from "express";
import { tryCatch } from "../utils/tryCatchHandler.js";

const favoriteRouter = express.Router();

favoriteRouter.post("/create", userAuthMiddleWare, tryCatch(addToFavourite));
favoriteRouter.get("/", userAuthMiddleWare, tryCatch(getFavourites));
favoriteRouter.patch("/:id", userAuthMiddleWare, tryCatch(removeFromFavourite));

export default favoriteRouter;
