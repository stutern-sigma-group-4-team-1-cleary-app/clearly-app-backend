import User from "../model/user.model.js";
import { codeReset } from "../utils/codeGeneration.js";

import {
  passwordEmailValidator,
  verifyCode,
  verifyPasswordField,
} from "../validators/user.validator.js";
import { verified } from "../utils/jwt.utils.js";
import { userPassword } from "../utils/passwordHashing.js";
import { sentMail } from "../Email/emailSending.js";
const arrMail = [];

export const emailForPassword = async (req, res) => {
  const { error } = passwordEmailValidator.validate(req.body);
  if (!error) {
    const { email } = req.body;
    const found = await User.findOne({ email: email }, { password: 0 });
    if (found) {
    arrMail.push(found._id);
      // console.log(req.headers.cookies)
      const userCode = codeReset();
      found.resetCode = `${userCode}`;
      found.save();
      await sentMail(found.email, `${userCode}`);
      process.env.FOUNDUSERID = found._id;
      res.status(200).json({
        success: true,
        message:
          "a reset code has been sent to your email, please ensure to check both your inbox and spam",
      });
    } else {
      res.status(404).json({
        success: false,
        message: " user not found",
        data: {},
      });
    }
  } else {
    res.status(422).json(error);
  }
};

export const codeResetVerification = async (req, res) => {
  // const user = verified(req.user);
  const { resetCode } = req.body;
  const { error } = verifyCode.validate(req.body);
  if (!error) {
    const userId = arrMail[0];
    const foundUser = await User.findOne({
      email: `${userId}`,
      resetCode:  resetCode,
    });
    if (foundUser) {
      //redirect to forgot password page
      res.status(200).json({
        success: true,
        message: "successfully changed",
        data: {},
      });
    } else {
      res.status(400).json({
        success: false,
        message: "you entered an invalid code",
        data: {},
      });
    }
  } else {
    res.status(422).json(error);
  }
};

export const passwordReset = async (req, res) => {
  const { password } = req.body;
  const { error } = verifyPasswordField.validate(req.bod);
  if (!error) {
     const userId = arrMail[0];
    const foundUser = await User.findOne({ email: `${userId}` });
    const newPassword = userPassword(password);
    foundUser.password = `${newPassword}`;
    foundUser.save();
    res.status(200).json({
      success: true,
      message: "password successfully updated",
      data: {},
    });
     arrMail[0]='';
  } else {
    res.status(422).json(error);
  }
};
