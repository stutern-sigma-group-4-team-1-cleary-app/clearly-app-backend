import { tryCatch } from "../utils/tryCatchHandler.js";
import { codeReset } from "../utils/codeGeneration.js";
import { sendMail } from "../Email/emailSending.js";
import {
  passwordEmailValidator,
  verifyCode,
  verifyPasswordField,
} from "../validators/user.validator.js";

import { User } from "../model/user.model.js";
import { verified } from "../utils/jwt.utils.js";
import { userPassword } from "../utils/passwordHashing.js";

export default class ForgotController {
  static async emailForPassword(req, res) {
    const { error } = passwordEmailValidator(req.body);
    if (!error) {
      const { email } = req.body;
      const found = await User.findOne(
        { emailAddress: email },
        { password: 0 }
      );
      if (found) {
        req.pass = found._id;
        found.resetCode = `${codeReset}`;
        found.save();
        await sendMail(found.email, codeReset);
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
  }

  static async codeResetVerification(req, res) {
    // const user = verified(req.user);
    const { resetCode } = req.body;
    const { error } = verifyCode(resetCode);
    if (!error) {
      const foundUser = await findOne({ _id: req.pass });
      if (foundUser) {
        //redirect to forgot password page
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
  }

  static async passwordReset(req, res) {
    // const user = verified(req.user);
    const { password } = req.body;
    const { error } = verifyPasswordField(password);
    if (!error) {
      const foundUser = await findOne({ _id: req.pass });
      const newPassword = userPassword(password);
      foundUser.password = `${newPassword}`;
      foundUser.save();
      res.status(200).json({
        success: true,
        message: "password successfully updated",
        data: {},
      });
    } else {
      res.status(422).json(error);
    }
  }
}
