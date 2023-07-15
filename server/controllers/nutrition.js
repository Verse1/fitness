import User from "../models/user";

export const addFood = async (req, res) => {
  try {
    const foodObject = req.body.foodObject;
    const userId = req.body.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    user.dailyFood.push(foodObject);
    await user.save();

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
