import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { globalErrorHandler } from "./src/utils/errorHandler.js";
import { config } from "./src/config/index.js";
import path from "path";
import bodyParser from 'body-parser';

// The Routes
import { router as userRouter } from "./src/router/user.route.js";
import { passwordRouter } from "./src/router/password_reset.route.js";
import favoriteRouter from './src/router/favourite.route.js';
import { router as homepageRouter } from "./src/router/homepage.route.js";
import sentenceRoutes from './src/router/sentence.route.js';
import translateRouter from './src/router/translate.route.js';
import historyRoutes from './src/router/history.route.js';

// Creating the Express App
const app = express();

// Database connection
mongoose.connect(config.mongodb_connection_url).then(() => console.log("Database Connection Established")).catch((e) => console.log(e.message));

// PORT configuration
const port = config.port || 8080;

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static(path.join(".", "src", "public")));
app.use(bodyParser.json());

// Routes
app.use("/api/clearly/user", userRouter);
app.use("/api/clearly/forgotpassword", passwordRouter);
app.use("/api/clearly/favourites", favoriteRouter);
app.use("/api/clearly/homepage", homepageRouter);
app.use('/api/clearly/sentences', sentenceRoutes);
app.use("/api/clearly/translate", translateRouter);
app.use('/api/clearly/history', historyRoutes);

app.use(globalErrorHandler);

// Setting up the express server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

export default app;
