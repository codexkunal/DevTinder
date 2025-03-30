const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kunal:Kunalsingh111@learningnode.enmvd.mongodb.net/DevTinder?retryWrites=true&w=majority&appName=LearningNode"
  );
};

module.exports = connectDB

