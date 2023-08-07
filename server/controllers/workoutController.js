import User from "../models/user";
import Workout from "../models/workoutSchema";

exports.createWorkout = async (req, res) => {
  try {
    const { workoutName, userId, notes, exercises } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const workout = new Workout({
      name: workoutName,
      notes: notes,
      exercises: exercises,
    });
    await workout.save();

    user.workouts.push(workout.id);

    await user.save();

    res.status(201).json(workout);
  } catch (error) {
    console.error("Error in createWorkout:", error);
    res.status(500).send(error);
  }
};

exports.fetchWorkouts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const workouts = await Workout.find({
      _id: { $in: user.workouts },
    });
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Error in fetchWorkouts:", error);
    res.status(500).send(error);
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.workouts = user.workouts.filter((workout) => workout.toString() !== workoutId);

    await user.save();

    await Workout.findByIdAndRemove(workoutId);

    res.status(200).json({ message: "Workout deleted" });
  } catch (error) {
    console.error("Error in deleteWorkout:", error);
    res.status(500).send(error);
  }
};
