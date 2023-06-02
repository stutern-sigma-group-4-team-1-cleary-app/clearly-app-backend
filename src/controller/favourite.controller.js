import { Favourite } from "../model/favourite.model.js";
import User from "../model/user.model.js";
import axios from "axios";
import dotenv from "dotenv";
import { covertToFavourite } from "../validators/user.validator.js";
dotenv.config();

//searches for a user that matches the user saved to req.user and retrieves details of the user alongside it's favourite items
export const getFavourites = async (req, res) => {
  const user = req.user;
  const getUser = await User.findOne(
    { email: user },
    { password: 0, confirmPassword: 0 }
  ).populate("favourite");
  if (getUser) {
    res.status(200).json({
      success: true,
      message: "User's favourite items retrieved successfully",
      data: {
        getUser,
      },
    });
  }
};

// export const markAsFavourite = async (req, res) => {
//   const user = req.user;
//   const found = User.findOne({ email: user });
//   await Favourite.create({
//     userId: found._id,
//     username: found.fullName,
//   });
//   res.status(200).json({
//     success: true,
//     message: "You have successfully added this to your list of favourites",
//     data: {},
//   });
// };
//when user creates a sentence the save button posts to this controller which converts based on the option selected by the user either audio/sign language
export const addToFavourite = async (req, res) => {
  const user = req.user;
  const { error } = covertToFavourite.validate(req.body);
  if (!error) {
    const { sentence, option } = req.body;
    if (option == "audio") {
      const encodedParams = new URLSearchParams();
      encodedParams.set("voice_code", "en-US-1");
      encodedParams.set("text", `${sentence}`);
      encodedParams.set("speed", "1.00");
      encodedParams.set("pitch", "1.00");
      encodedParams.set("output_type", "audio_url");

      const options = {
        method: "POST",
        url: "https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": `${process.env.SPEECH_KEY}`,
          "X-RapidAPI-Host": "cloudlabs-text-to-speech.p.rapidapi.com",
        },
        data: encodedParams,
      };

      try {
        const response = await axios.request(options);
        const item = response.data;
        const favouriteItem = await Favourite.create({
          isAudio: true,
          url: item.result.audio_url,
        });
        const foundUser = await User.findOne({
          email: user,
        });
        foundUser.favourite.push(favouriteItem);
        await foundUser.save();
        res.status(200).json({
          success: true,
          message: "Sentence successfully converted into audio",
          data: {
            isAudio: favouriteItem.isAudio,
            url: item.result.audio_url,
          },
        });
      } catch (error) {
        console.error(error);
      }
    } else if (option == "sign") {
      //convert to sign language
    }
  }
  return res.status(422).json(error);
};

export const removeFromFavourite = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  await User.updateOne({ email: user }, { $pull: { favourite: id } });
  res.status(200).json({
    success: true,
    message: "You have successfully removed this item from your favourite list",
    data: {},
  });
};
