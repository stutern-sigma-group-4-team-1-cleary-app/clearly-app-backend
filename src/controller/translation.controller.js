import { translation } from "../validators/user.validator";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const translateFromTextToText = async (req, res) => {
  const { error } = translation.validate(req.body);
  if (!error) {
    const { option, value, from, to } = req.body;
    if (option == "text") {
      const options = {
        method: "POST",
        url: "https://translate-plus.p.rapidapi.com/translate",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": `${process.env.SPEECH_KEY}`,
          "X-RapidAPI-Host": "translate-plus.p.rapidapi.com",
        },
        data: {
          text: `${value}`,
          source: `${from}`,
          target: `${to}`,
        },
      };

      try {
        const response = await axios.request(options);
        const item ={...response};
        res.status(200).json({
          success: true,
          message: "Translation was successful",
          data:item
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Translation failed",
          data: {},
        });
      }
    } else if (option == "sound") {
      const encodedParams = new URLSearchParams();
      encodedParams.set("text", `${value}`);
      encodedParams.set("language_code", `${to}`);
      encodedParams.set("gender", "male");

      const options = {
        method: "POST",
        url: "https://text-to-speech7.p.rapidapi.com/voice",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": `${process.env.SPEECH_KEY}`,
          "X-RapidAPI-Host": "text-to-speech7.p.rapidapi.com",
        },
        data: encodedParams,
      };

      try {
        const response = await axios.request(options);
        const item = { ...response };
        res.status(200).json({
          success: true,
          message: "Translation successful",
          data: item,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Translation failed",
          data: {},
        });
      }
    }
  }
  return res.status(422).json({
    success: false,
    message: "failed validation",
    data: error,
  });
};

export const translateFromSpeech = async (req, res) => {
  const { error } = translation.validate(req.body);
  if (!error) {
    const encodedParams = new URLSearchParams();
    encodedParams.set("audio_url", `${value}`);
    encodedParams.set("language_code", `${to}`);

    const options = {
      method: "POST",
      url: "https://speech-recognition14.p.rapidapi.com/recognize",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": `${process.env.SPEECH_KEY}`,
        "X-RapidAPI-Host": "speech-recognition14.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      const item = { ...response };
      res.status(200).json({
        success: true,
        message: "Speech to text was successful",
        data: item,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Translation failed",
        data: {},
      });
    }
  }
};
