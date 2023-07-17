import express from "express";
const router = express.Router();
import * as WorkoutController from "../controllers/workoutController";

router.get("/workout/:userId", WorkoutController.fetchWorkouts);
router.post("/workout", WorkoutController.createWorkout);
router.delete("/workout/:workoutId", WorkoutController.deleteWorkout);

export default router;
