const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();
const connectDB = async () => {
  await mongoose.connect(
    process.env.mongoDB_URI,
   
  );
};

module.exports = connectDB

