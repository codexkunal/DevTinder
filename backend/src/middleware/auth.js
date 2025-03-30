const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const authAdmin = (req, res, next) => {
//   const token = "xyz";
//   const isAdminToken = token === "xyz";
//   if (!isAdminToken) {
//     res.status(400).send("unAuthorized Request");
//   } else {
//     next();
//   }
// };

const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    // console.log(req);
    // console.log(cookie, "in the middleware");
    const { token } = cookie;
    if (!token) {
      res.status(401).send("please login!!")
    }
    console.log(token)
    const decodedToken = jwt.verify(token, "Kunalsingh");
    console.log(decodedToken);
      
    const { id } = decodedToken;

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not Found. Try Again");
    }
    req.user = user;
    next();
  } catch (err) {
   console.log(err)
  }
};

module.exports = userAuth
