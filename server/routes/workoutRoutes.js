import express from "express";
const router = express.Router();
import * as WorkoutController from "../controllers/workoutController";

router.post("/workout", WorkoutController.createWorkout);
router.delete("/workout", WorkoutController.deleteWorkout);

export default router;
