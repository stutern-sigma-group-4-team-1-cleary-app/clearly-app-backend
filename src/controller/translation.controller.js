import axios from "axios";
import dotenv from "dotenv";
import TranslationHistory from "../model/history.model.js";
import { saveTranslation } from "../controller/history.controller.js";
import {
  BadUserRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../error/error.js";
import { translation } from "../validators/user.validator.js";

dotenv.config();

export const translateFromTextToText = async (req, res) => {
  const { error } = translation.validate(req.body);
  if (error) {
    throw new BadUserRequestError("Validation failed", error.details);
  }

  const { option, value, from, to } = req.body;

  if (option === "text") {
    const options = {
      method: "POST",
      url: "https://translate-plus.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.TRANSLATE_KEY,
        "X-RapidAPI-Host": "translate-plus.p.rapidapi.com",
      },
      data: {
        text: value,
        source: from,
        target: to,
      },
    };

    try {
      const response = await axios.request(options);
      const item = response.data; // Extract response data

      // Save translation to history
      await saveTranslationToHistory({
        option,
        originalText: value,
        translatedText: item.translations.translation,
        userId: req.user.id,
      });

      res.status(200).json({
        success: true,
        message: "Translation was successful",
        data: item,
      });
    } catch (error) {
      throw new BadUserRequestError("Translation failed");
    }
  } else if (option === "sound") {
    const encodedParams = new URLSearchParams();
    encodedParams.set("text", value);
    encodedParams.set("language_code", to);
    encodedParams.set("gender", "male");

    const options = {
      method: "POST",
      url: "https://text-to-speech7.p.rapidapi.com/voice",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.GENDER_SPEECH_KEY,
        "X-RapidAPI-Host": "text-to-speech7.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      const item = response.data; // Extract response data

      // Save translation to history
      await saveTranslationToHistory({
        option,
        originalText: value,
        translatedText: item.translations.translation,
        userId: req.user.id,
      });

      res.status(200).json({
        success: true,
        message: "Translation successful",
        data: item,
      });
    } catch (error) {
      throw new BadUserRequestError("Translation failed");
    }
  } else {
    throw new BadUserRequestError("Invalid option");
  }
};

export const translateFromSpeech = async (req, res) => {
  const { error } = translation.validate(req.body);
  if (error) {
    throw new BadUserRequestError("Validation failed", error.details);
  }

  const { value, to } = req.body;

  const encodedParams = new URLSearchParams();
  encodedParams.set("audio_url", value);
  encodedParams.set("language_code", to);

  const options = {
    method: "POST",
    url: "https://speech-recognition14.p.rapidapi.com/recognize",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.SPEECH_RECOGNITION_KEY,
      "X-RapidAPI-Host": "speech-recognition14.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    const item = response.data; // Extract response data

    // Save translation to history
    await saveTranslationToHistory(item, req.user.id);

    res.status(200).json({
      success: true,
      message: "Speech to text was successful",
      data: item,
    });
  } catch (error) {
    throw new BadUserRequestError("Translation failed");
  }
};

const saveTranslationToHistory = async (translationData) => {
  try {
    await saveTranslation(
      translationData.option,
      translationData.originalText,
      translationData.translatedText,
      translationData.userId
    );
  } catch (error) {
    console.error("Failed to save translation to history:", error);
    // Handle the error as per your application's requirements
  }
};

