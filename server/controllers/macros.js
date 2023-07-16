import User from "../models/user";

export const macros = async (req, res) => {
  try {
    // const foodObject = req.body.foodObject;
    const {dailyCalories, dailyProtein, dailyFats, dailyCarbs } = req.body

    const userId = req.body.id

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    user.dailyCalories = dailyCalories
    user.dailyProtein = dailyProtein
    user.dailyFats = dailyFats
    user.dailyCarbs = dailyCarbs


    // user.dailyFood.push(foodObject);
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
