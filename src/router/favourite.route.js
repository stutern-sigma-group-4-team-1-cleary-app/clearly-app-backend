import {
  addToFavourite,
  getFavourites,
  removeFromFavourite,
} from "../controller/favourite.controller.js";
// import { userAuthMiddleWare } from "../middlewares/auth.middleware.js";

import express from "express";
// import { tryCatch } from "../utils/tryCatchHandler.js";

const favoriteRouter = express.Router();

favoriteRouter.post("/create", addToFavourite);
favoriteRouter.get("/", getFavourites);
favoriteRouter.patch("/:id", removeFromFavourite);

export default favoriteRouter;
