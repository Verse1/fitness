require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import User from "./models/user";
import Workout from "./models/workoutSchema";

import workoutRoutes from "./routes/workoutRoutes";
import authRoutes from "./routes/auth";

const morgan = require("morgan");
const cron = require("node-cron");

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

// reset every 24 hours
cron.schedule("43 23 * * *", async () => {
  try {
    // find all user accounts
    const users = await User.find({});

    //make logic for weekly....

    const dayName = new Date().toLocaleString("en-US", { weekday: "long" });
    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    // clear  the dailyFood array for each user
    users.forEach(async (user) => {
      let protein = 0,
        carbs = 0,
        fats = 0,
        calories = 0;

      const { dailyFood } = user;

      for (const item of dailyFood) {
        protein += item.protein;
        carbs += item.carbs;
        fats += item.fats;
        calories += item.calories;
      }

      const dailyObject = {
        day: dayName,
        date: formattedDate,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fats: fats,
      };

      user.weeklyFood.push(dailyObject);
      user.dailyFood = [];
      await user.save();
    });

    console.log("Cron job completed successfully.");
  } catch (error) {
    console.error("An error occurred during the cron job:", error);
  }
});

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
// aint no way bruh, you gotta import shit before the other because it needs to be defined when you call it
app.use("/api", workoutRoutes);
app.use("/api", authRoutes);

app.listen(8000, () => console.log("Server Running on Port 8000"));
