const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();
// console.log(process.env.mongoDB_URI)
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kunal:Kunalsingh111@learningnode.enmvd.mongodb.net/DevTinder?retryWrites=true&w=majority&appName=LearningNode"
  );
};

module.exports = connectDB

