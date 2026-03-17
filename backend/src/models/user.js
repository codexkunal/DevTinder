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
      maxLength: 500,
    },
    profileUrl: {
      type: String,
      default: "",
    },

    // =====================
    // Extended Profile Fields
    // =====================
    title: {
      type: String,
      default: "",
      maxLength: 100,
    },
    location: {
      type: String,
      default: "",
      maxLength: 100,
    },
    github: {
      type: String,
      default: "",
      maxLength: 200,
    },
    linkedin: {
      type: String,
      default: "",
      maxLength: 200,
    },
    portfolio: {
      type: String,
      default: "",
      maxLength: 200,
    },
    interests: {
      type: [String],
      default: [],
      validate(value) {
        if (value.length > 10) {
          throw new Error("Cannot add more than 10 interests");
        }
      },
    },
    languages: {
      type: [
        {
          name: { type: String, required: true },
          proficiency: { type: Number, min: 0, max: 100, default: 50 },
        },
      ],
      default: [],
      validate(value) {
        if (value.length > 10) {
          throw new Error("Cannot add more than 10 languages");
        }
      },
    },
    projects: {
      type: [
        {
          name: { type: String, required: true },
          description: { type: String, default: "" },
          imageUrl: { type: String, default: "" },
          repoUrl: { type: String, default: "" },
          stars: { type: Number, default: 0 },
          forks: { type: Number, default: 0 },
          tag: { type: String, default: "" },
        },
      ],
      default: [],
      validate(value) {
        if (value.length > 10) {
          throw new Error("Cannot add more than 10 projects");
        }
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
