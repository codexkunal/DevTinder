const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser");
const http = require('http')
const socket = require('socket.io')

// "https://dev-tinder-sandy.vercel.app"
// " http://localhost:5173/"

app.use(cookieParser());
app.use(
  cors({
    origin:"https://dev-tinder-sandy.vercel.app", // Allow frontend origin
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
const initialize = require("./utils/socket")


const server = http.createServer(app)

initialize(server)
// initialize(server)



connectDB()
  .then(() => {
    server.listen(3000, () => {
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



app.get("/admin/getAlldata", (req, res) => {
  res.send("All Data is Sent");
});
