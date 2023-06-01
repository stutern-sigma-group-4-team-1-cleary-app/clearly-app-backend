import {
  addToFavourite,
  getFavourites,
  removeFromFavourite,
} from "../controller/favourite.controller.js";

import express from "express";

const favoriteRouter = express.Router();

favoriteRouter.post("/create", addToFavourite);
favoriteRouter.get("/", getFavourites);
favoriteRouter.patch("/:id", removeFromFavourite);

export default favoriteRouter;
