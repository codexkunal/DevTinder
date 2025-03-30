const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [4, "Name should be not be less thav 4 character"],
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid Mail" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 65,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Please gave correct gender");
        }
      },
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 10) {
          throw new Error("Cannot add more than 10 skills");
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about of user",
      maxLength : 100
    },
    profileUrl: {
      type: String,
      default:
        "https://www.google.com/imgres?q=user%20image&imgurl=https%3A%2F%2Ffreesvg.org%2Fimg%2F1459344336.png&imgrefurl=https%3A%2F%2Ffreesvg.org%2Ffemale-user-icon&docid=KAUwNXKfGoRxKM&tbnid=KQ6_O_8WK9hD-M&vet=12ahUKEwi2_qregrSLAxVem68BHbpDMEMQM3oECGEQAA..i&w=600&h=600&hcb=2&ved=2ahUKEwi2_qregrSLAxVem68BHbpDMEMQM3oECGEQAA",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
