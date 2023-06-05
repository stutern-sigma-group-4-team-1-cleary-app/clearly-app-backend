import axios from "axios";
import fs from "fs";
import path from "path";
import User from "../model/user.model.js";
import Sentence from "../model/sentence.model.js";
import { config } from "../config/index.js";
import {
  searchSentenceValidator,
  copyImageValidator,
  downloadImageValidator,
  shareImageValidator,
  favoriteImageValidator
} from "../validators/user.validator.js";

import { BadUserRequestError, NotFoundError } from "../error/error.js";

export const searchSentence = async (req, res) => {
  try {
    const { error, value } = searchSentenceValidator.validate(req.query);
    if (error) {
      throw new BadUserRequestError(error.details[0].message);
    }

    const { sentence } = value;

    const options = {
      method: "GET",
      url: "https://bing-image-search1.p.rapidapi.com/images/search",
      params: {
        q: `${sentence} in american sign language illustration`,
      },
      headers: {
        "X-RapidAPI-Key": config.sentence_img_key,
        "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    const results = response.data.value;

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No sign language representation found for the sentence",
        data: [],
      });
    }

    const signLanguageResult = results[0].thumbnailUrl;
    const relatedSearches = results
      .slice(1, 4)
      .map((result) => result.thumbnailUrl);


    const sentenceData = {
      sentence,
      signLanguageResult,
      relatedSearches,
    };

    const savedSentence = await Sentence.create(sentenceData);

    res.status(200).json({
      success: true,
      message: "Sign language representation retrieved successfully",
      data: {
        signLanguageResult: savedSentence.signLanguageResult,
        relatedSearches: savedSentence.relatedSearches,
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof BadUserRequestError) {
      res.status(400).json({
        success: false,
        message: error.message,
        data: [],
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        data: [],
      });
    }
  }
};


export const copyImage = async (req, res) => {
  try {
    const { error, value } = copyImageValidator.validate(req.body);
    if (error) {
      throw new BadUserRequestError(error.details[0].message);
    }

    const { imageUrl } = value;
    const imagePath = path.join(".", "public", "images", "temp");
    const imageExtension = path.extname(imageUrl);
    const imageName = `${Date.now()}${imageExtension}`;
    const imagePathWithFileName = path.join(imagePath, imageName);

    const response = await axios.get(imageUrl, {
      responseType: "stream",
    });

    response.data.pipe(fs.createWriteStream(imagePathWithFileName));

    response.data.on("end", () => {
      res.status(200).json({
        success: true,
        message: "Image copied successfully",
        data: {
          imagePath: imagePathWithFileName,
          imageName,
        },
      });
    });
  } catch (error) {
    console.error(error);
    if (error instanceof BadUserRequestError) {
      res.status(400).json({
        success: false,
        message: error.message,
        data: [],
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        data: [],
      });
    }
  }
};

export const downloadImage = async (req, res) => {
  try {
    const { error, value } = downloadImageValidator.validate(req.body);
    if (error) {
      throw new BadUserRequestError(error.details[0].message);
    }

    const { imageUrl } = value;

    const response = await axios.get(imageUrl, {
      responseType: "stream",
    });

    res.setHeader("Content-Disposition", "attachment; filename=image.png");
    response.data.pipe(res);
  } catch (error) {
    console.error(error);
    if (error instanceof BadUserRequestError) {
      res.status(400).json({
        success: false,
        message: error.message,
        data: [],
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        data: [],
      });
    }
  }
};

export const shareImage = async (req, res) => {
  try {
    const { error, value } = shareImageValidator.validate(req.body);
    if (error) {
      throw new BadUserRequestError(error.details[0].message);
    }

    const { imageUrl } = value;
    // I will add share implementation here

    res.status(200).json({
      success: true,
      message: "Image shared successfully",
      data: {},
    });
  } catch (error) {
    console.error(error);
    if (error instanceof BadUserRequestError) {
      res.status(400).json({
        success: false,
        message: error.message,
        data: [],
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        data: [],
      });
    }
  }
};

export const favoriteImage = async (req, res) => {
  try {
    const { error, value } = favoriteImageValidator.validate(req.body);
    if (error) {
      throw new BadUserRequestError(error.details[0].message);
    }

    const { imageUrl } = value; 
    const { email } = req.user;

    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const sentence = await Sentence.findOne({ signLanguageResult: imageUrl });
    if (!sentence) {
      throw new NotFoundError("Sentence not found");
    }

    if (user.favourite.includes(sentence._id)) {
      return res.status(400).json({
        success: false,
        message: "Sentence already favorited",
        data: [],
      });
    }

    user.favourite.push(sentence._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Image favorited successfully",
      data: {},
    });
  } catch (error) {
    console.error(error);
    if (error instanceof NotFoundError) {
      res.status(404).json({
        success: false,
        message: error.message,
        data: [],
      });
    } else if (error instanceof BadUserRequestError) {
      res.status(400).json({
        success: false,
        message: error.message,
        data: [],
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        data: [],
      });
    }
  }
};


export const unfavoriteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.user;

    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Find the index of the image ID in the user's favorite array
    const imageIndex = user.favourite.findIndex((imageId) => imageId.toString() === id.toString());

    // If the image ID is not found in the favorite array, throw an error
    if (imageIndex === -1) {
      throw new NotFoundError("Image is not favorited");
    }

    // Remove the image ID from the favorite array
    user.favourite.splice(imageIndex, 1);

    // Save the updated user object
    await user.save();

    res.status(200).json({
      success: true,
      message: "Image unfavorited successfully",
      data: {},
    });
  } catch (error) {
    console.error(error);
    if (error instanceof NotFoundError) {
      res.status(404).json({
        success: false,
        message: error.message,
        data: [],
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        data: [],
      });
    }
  }
};
