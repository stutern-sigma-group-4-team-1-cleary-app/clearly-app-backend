import { Favourite } from "../model/favourite.model";
import User from "../model/user.model.js";
import { Favourite } from "./../model/favourite.model";

export const getFavourites = async (req, res) => {
  const user = req.user;
  const getUser = User.findOne({ email: user }, { password: 0 });
  const getAllFavourite = Favourite.find(
    { userId: getUser._id },
    { userId: 0 }
  );
  if (getAllFavourite.length > 0) {
    res.json(200).json({
      success: true,
      message: "User's favourite items retrieved successfully",
      data: {
        getAllFavourite,
      },
    });
  }
};

export const markAsFavourite = async (req, res) => {
  const user = req.user;
  const found = User.findOne({ email: user });
  await Favourite.create({
    userId: found._id,
    username: found.fullName,
  });
  res.status(200).json({
    success: true,
    message: "You have successfully added this to your list of favourites",
    data: {},
  });
};
