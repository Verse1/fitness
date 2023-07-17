import express from "express";
// import { signup, signin } from '../controllers/auth'

const router = express.Router();

//controllers
const { signup, signin } = require("../controllers/auth");
const { addWeight } = require("../controllers/weight");
const { macros } = require("../controllers/macros");
const { addFood } = require("../controllers/nutrition.js");

router.get("/", (req, res) => {
  return res.json({
    data: "Hello",
  });
});

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/addWeight", addWeight);
router.post("/addFood", addFood);
router.post("/macros", macros);

export default router;
