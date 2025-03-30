const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const  User = require("../models/user")
const {validateUserData} = require("../utils/validation");
// const cors = require("cors")
const authRouter = express.Router()


// const cors = require("cors")



// API for signup
authRouter.post("/signup", async (req, res) => {
    try {
      const data = validateUserData(req.body);
      const password = data.password;
      const hashPassword = await bcrypt.hash(password, 10);
    //   console.log(data);
    //   console.log(hashPassword);
      const user = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashPassword,
      });
     const savedUser = await user.save();
     const token = jwt.sign({id:savedUser._id}, "Kunalsingh", {expiresIn:"1d"})
     res.cookie("token", token, {expire: 360000 + Date.now()})
      res.json({message : "user added successfully", data:savedUser});
    } catch (err) {
      res.status(400).send("Something Went wrong" + err.message);
    }
  });

authRouter.post("/login", async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      console.log( req.body.password)
      console.log(req.body.email)


      // console.log("Full request body:", req.body);  // Check received structure
      // console.log("Email:", req.body.emailId); // Debug email
      // console.log("Password:", req.body.password); // Debug password

      const user = await User.findOne({ email: email });
      console.log(user);
      if (!user) {
        throw new Error("Invalid Credentials");
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      // const isValidPassword = await bcrypt.compare("Kunalsingh@123","$2b$10$kTbI3xiSybRU17gN98pXZeXB9KCZGr1l1S9XkXYJ98YJdGOINz3zG");

      if (isValidPassword) {
        //  jwt token
        const token = await jwt.sign({id:user._id}, "Kunalsingh", {expiresIn:"1d"})
        // console.log(token);
        res.cookie("token", token,{expire: 360000 + Date.now()})
        res.status(200).send(user);
      } else {
        throw new Error("Password is not Valid");
      }
    } catch (err) {
      res.status(400).send("something went wrong while logging in" + err.message);
    }
  });

  

authRouter.post("/logout", (req,res)=>{
    res.cookie("token", {expire:Date.now()})
    res.send("Log out successfully")
})

module.exports = authRouter