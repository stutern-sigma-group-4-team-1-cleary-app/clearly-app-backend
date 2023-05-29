import express from "express";
import User from "../model/user.model.js";
import { codeReset } from "../utils/codeGeneration.js";
import dotenv from "dotenv";
import {
  passwordEmailValidator,
  verifyCode,
  verifyPasswordField,
} from "../validators/user.validator.js";
import { userPassword } from "../utils/passwordHashing.js";
import { sentMail } from "../Email/emailSending.js";
dotenv.config();

const router = express.Router();

const arrMail = [];

export const emailForPassword = async (req, res) => {
  const { error } = passwordEmailValidator.validate(req.body);
  if (!error) {
    const { email } = req.body;
    const found = await User.findOne({ email: email }, { password: 0 });
    if (found) {
      req.app.locals.userMail = found.email;
      arrMail.push(found.email);
      const userCode = codeReset();
      found.resetCode = userCode;
      found.save();
      await sentMail(found.email, userCode);
      process.env.FOUNDUSERID = found._id;
      res.status(200).json({
        success: true,
        message:
          "A reset code has been sent to your email. Please ensure to check both your inbox and spam.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found.",
        data: {},
      });
    }
  } else {
    res.status(422).json(error);
  }
};

export const codeResetVerification = async (req, res) => {
  const { resetCode } = req.body;
  const { error } = verifyCode.validate(req.body);
  if (!error) {
    const userEmail = req.app.locals.userMail;
    const foundUser = await User.findOne({ email: userEmail, resetCode: resetCode });
    if (foundUser) {
      res.status(200).json({
        success: true,
        message: "Successfully changed.",
        data: {},
      });
    } else {
      res.status(400).json({
        success: false,
        message: "You entered an invalid code.",
        data: {},
      });
    }
  } else {
    res.status(422).json(error);
  }
};


export const passwordReset = async (req, res) => {
  const { password } = req.body;
  const { error } = verifyPasswordField.validate(req.body);
  if (!error) {
    const userEmail = req.app.locals.userMail;
    const foundUser = await User.findOne({ email: userEmail });
    if (foundUser) {
      const newPassword = await userPassword(password);
      foundUser.password = newPassword;
      foundUser.save();
      res.status(200).json({
        success: true,
        message: "Password successfully updated.",
        data: {},
      });
      arrMail[0] = "";
    } else {
      res.status(404).json({
        success: false,
        message: "User not found.",
        data: {},
      });
    }
  } else {
    res.status(422).json(error);
  }
};
