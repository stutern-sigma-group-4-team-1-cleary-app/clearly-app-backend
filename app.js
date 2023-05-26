import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { globalErrorHandler } from "./src/utils/errorHandler.js";
import { config } from "./src/config/index.js";

// The Routes
import { router as userRouter } from "./src/router/user.route.js";

// Creating the Expres App
const app = express();

// Database connection
// console.log(config)
console.log(config.mongodb_connection_url)
mongoose.connect(config.mongodb_connection_url).then(() => console.log("Database Connection Established")).catch((e) => console.log(e.message));

// PORT configuration
const port = config.port || 8080;

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());

// Routes
app.use("/api/clearly/user", userRouter);

app.use(globalErrorHandler);

// Setting up the express server
app.listen(port, () => {
  console.log(`Server runnning on port: ${port}`);
});
