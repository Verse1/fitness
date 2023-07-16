import User from "../models/user";
import { hashedPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
require("dotenv").config();
export const signup = async (req, res) => {
  try {
    const { name, email, password, gender, weight, height, age, heightUnit, weightUnit, dailyCalories, dailyProtein, dailyCarbs, dailyFats } =
      req.body;

    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }

  
    const currentDate = new Date().toDateString();
   const date = currentDate.slice(4, 10) + currentDate.slice(10)

  
    // Hash password later

    const theHashedPassword = await hashedPassword(password);
    const user = await new User({
      name,
      email,
      password: theHashedPassword, //hashedPassword
      gender,
      weight,
      height,
      age,
      heightUnit,
      weightUnit,
      weightHistory: [{weight, date, changeWeight: 0}],
      dailyFood: [],
      workouts: [],
      weeklyFood: [],
      dailyCalories,
       dailyProtein, 
       dailyCarbs, 
       dailyFats
    }).save();

    //creating signed token

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(user);

    const { password: userPassword, ...rest } = user._doc;

    return res.json({
      token,
      user: rest,
      userId: user._id,
    });
  } catch (err) {
    console.log("error:", err);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: "No user found",
      });
    } else {
      console.log("FOUND");
    }

    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }

    // If the password matches, continue with further logic

    //create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;

    return res.json({
      token,
      user,
      userId: user._id,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};
