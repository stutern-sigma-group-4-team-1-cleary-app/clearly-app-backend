import { translation } from "../validators/user.validator.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const translateFromTextToText = async (req, res) => {
  const { error } = translation.validate(req.body);
  if (!error) {
    const { option, value, from, to } = req.body;
    if (option == "text") {
      const encodedParams = new URLSearchParams();
      encodedParams.set("source_language", `${from}`);
      encodedParams.set("target_language", `${to}`);
      encodedParams.set("text", `${value}`);

      const options = {
        method: "POST",
        url: "https://text-translator2.p.rapidapi.com/translate",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": `${process.env.SPEECH_KEY}`,
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        data: encodedParams,
      };

      try {
        const response = await axios.request(options);
        const newResponse = response.data;
        const item = { ...newResponse };
        return res.status(200).json({
          success: true,
          message: "Translation successful",
          data: item,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Translation failed",
          data: {},
        });
      }
    } else if (option == "sound") {
      const options = {
        method: "POST",
        url: "https://joj-text-to-speech.p.rapidapi.com/",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "8cadc44954msh0c2f19c00698a0bp16c2a0jsn4b7b57b4733f",
          "X-RapidAPI-Host": "joj-text-to-speech.p.rapidapi.com",
        },
        data: {
          input: {
            text: `${value}`,
          },
          voice: {
            languageCode: "en-US",
            name: "en-US-News-L",
            ssmlGender: "FEMALE",
          },
          audioConfig: {
            audioEncoding: "MP3",
          },
        },
      };

      try {
        const response = await axios.request(options);
        const newResponse = response.data;
        const item = { ...newResponse };
        return res.status(200).json({
          success: true,
          message: "Translation was successful",
          data: item,
        });
      } catch (error) {
        return res.status(400).json({
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
      return res.status(200).json({
        success: true,
        message: "Speech to text was successful",
        data: item,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Translation failed",
        data: {},
      });
    }
  }
  return res.status(422).json({
    success: false,
    message: "failed validation",
    data: error,
  });
};
