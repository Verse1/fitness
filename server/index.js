require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";
import workoutRoutes from "./routes/workoutRoutes";

const morgan = require("morgan");

const app = express();

//mongose connetions
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("connexted to DB"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

//route middlewares
app.use("/api", authRoutes);
app.use("/api", workoutRoutes);

app.listen(8000, () => console.log("Server Running on Port 8000"));
