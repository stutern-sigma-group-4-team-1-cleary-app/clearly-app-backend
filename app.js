import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { globalErrorHandler } from "./src/utils/errorHandler.js";
import { config } from "./src/config/index.js";
import path from "path";

// The Routes
import { router as userRouter } from "./src/router/user.route.js";
import { passwordRouter } from "./src/router/password_reset.route.js";
import favoriteRouter from './src/router/favourite.route';
import { router as homepageRouter } from "./src/router/homepage.route.js";
import  translateRouter from './src/router/translate.route';

// Creating the Expres App
const app = express();

// Database connection
mongoose
  .connect(config.mongodb_connection_url)
  .then(() => console.log("Database Connection Established"))
  .catch((e) => console.log(e.message));

// PORT configuration
const port = config.port || 8080;
//SET-UP HBS
// app.engine('handlebars',exphbs());
// app.set('view engine','handlebars');
// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static(path.join(".", "src", "public")));

// Routes
app.use("/api/clearly/user", userRouter);
app.use("/api/clearly/forgotpassword", passwordRouter);

app.use("/api/clearly/favourites", favoriteRouter);

// app.use(navRouter);

app.use("/api/clearly/homepage", homepageRouter);

app.use("/api/clearly/favourites", favoriteRouter);

app.use("/api/clearly/translate", translateRouter);

app.use(globalErrorHandler);

// Setting up the express server
const server=app.listen(port, () => {
  console.log(`Server runnning on port: ${port}`);
});


export default app;
