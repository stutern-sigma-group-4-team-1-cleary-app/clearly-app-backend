import User from "../model/user.model.js";
import { createUserValidator, loginValidator, } from "../validators/user.validator.js";
import { BadUserRequestError, NotFoundError } from "../error/error.js";
import { genToken } from "../utils/jwt.utils.js";
import bcrypt from "bcrypt";
import { config } from "../config/index.js";

// CREATE USER
export default class UserController {
  static async createUser(req, res) {
    const { error, value } = await createUserValidator.validate(req.body);
    if (error) throw error;

    const emailExist = await User.find({ email: req.body.email });
    if (emailExist.length > 0)
      throw new BadUserRequestError("Email already exists");

    const saltRounds = Number(config.bcrypt_salt_round);
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = {
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      confirmPassword: req.body.confirmPassword,
      password: hashPassword,
    };

    const newUser = await User.create(user);
    res.status(200).json({
      message: "User created successfully",
      status: "Success",
      data: {
        user: newUser,
        signup_token: genToken(newUser),
      },
    });
  }


  // SEARCH USER
  static async searchUser(req, res,) {
    const user = await User.findOne({ email: req.query?.email })
    if (!user) throw new NotFoundError('User not found')

    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        user
      }
    })
  }

  // LOGIN USER
  static async loginUser(req, res) {
    const { error } = loginValidator.validate(req.body);
    if (error) throw error;
    if (!req.body.email)
      throw new BadUserRequestError("Please provide your email before login");

    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new NotFoundError("User not found");

    const hash = bcrypt.compareSync(req.body.password, user.password);
    if (!hash) throw new BadUserRequestError("email or password is incorrect");
    res.status(200).json({
      message: "Login successfully",
      status: "success",
      data: {
        user,
        login_token: genToken(user),
      },
    });
  }
}
