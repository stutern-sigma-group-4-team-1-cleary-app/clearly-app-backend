const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16,
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 8,
    max: 16,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
