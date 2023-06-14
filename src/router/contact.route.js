import { getUserContacts, addContact } from "../controller/contanct.controller";

import { tryCatch } from "../utils/tryCatchHandler.js";

import express from "express";

const contactRouter = express.Router();

contactRouter.post("/add", tryCatch(addContact));

contactRouter.get("/", tryCatch(getUserContacts));

export default contactRouter;
