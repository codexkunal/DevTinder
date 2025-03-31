const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser");
// "https://dev-tinder-sandy.vercel.app"

app.use(cookieParser());
app.use(
  cors({
    origin: "https://dev-tinder-sandy.vercel.app", // Allow frontend origin
    credentials: true, // Allow cookies if needed
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const User = require("./models/user");
const connectDB = require("./config/database");
const { authAdmin, userAuth } = require("../src/middleware/auth");
const validateUserData = require("./utils/validation");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running");
    });
    console.log("Connect successfully");
  })
  .catch((err) => {
    console.log("cannot connnect to the database", err);
  });

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

// API For adding the user in Database
// app.post("/signup", async (req, res) => {
//   try {
//     const data = validateUserData(req.body);
//     const password = data.password;
//     const hashPassword = await bcrypt.hash(password, 10);
//     console.log(data);
//     console.log(hashPassword);
//     const user = new User({
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       password: hashPassword,
//     });
//     await user.save();
//     res.send("user added successfully");
//   } catch (err) {
//     res.status(400).send("Something Went wrong" + err.message);
//   }
// });

// API for Login User
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email });
//     console.log(user);
//     if (!user) {
//       throw new Error("Invalid Credentials");
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (isValidPassword) {
//       //  jwt token
//       const token =  jwt.sign({id:user._id}, "Kunalsingh", {expiresIn:"1d"})
//       console.log(token);
//       res.cookie("token", token,{expire: 360000 + Date.now()})
//       res.status(200).send("user Logged in Successfully");
//     } else {
//       throw new Error("Password is not Valid");
//     }
//   } catch (err) {
//     res.status(400).send("something went wrong while logging in" + err.message);
//   }
// });


// API For getting the user profile using cookies and jwt
// app.get("/profile", userAuth,  async (req, res) => {
//   try {
//      const user = req.user
//     if (user) {
//       return res.status(200).json(user);
//     } else {
//       return res.status(404).send("User not found");
//     }
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).send("Something went wrong. Please try again.");
//   }
// });

// API for Getting the All the user From Database
// app.get("/feed", async (req, res) => {
//   try {
//     const allUser = await User.find({});
//     res.send(allUser);
//     // console.log(allUser);
//   } catch (err) {
//     res.status(404).send("Something went wrong");
//     console.log(err);
//   }
// });

// API For Deleting user by id
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     await User.findOneAndDelete(userId);
//     res.send("user deleted Successfully");
//   } catch (err) {
//     res.status(404).send("Something went wrong");
//   }
// });

// API For updating the user by id
// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   const data = req.body;

//   if (data.email) {
//     delete data.email;
//   }

//   try {
//     const updateUser = await User.findByIdAndUpdate(userId, data, {
//       new: true,
//       runValidators: true,
//     });
//     res.send(updateUser);
//     console.log(updateUser);
//   } catch (err) {
//     res.status(404).send("Something went wrong" + err);
//   }
// });

// app.use("/admin", authAdmin);

app.get("/admin/getAlldata", (req, res) => {
  res.send("All Data is Sent");
});
