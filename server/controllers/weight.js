import User from "../models/user";

export const addWeight = async (req, res) => {
  try {
    const { weight, date } = req.body.weightToday;
    const userId = req.body.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    // Push the weight and date object to the weightHistory array in the user document
    user.weightHistory.push({ weight, date });

    await user.save();

    // Save the updated user document
    user.password = undefined;
    user.secret = undefined;
    return res.json({
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
