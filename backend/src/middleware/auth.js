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
    if (!cookie || !cookie.token) {
      return res.status(401).json({ message: "Please login!!" });
    }

    const { token } = cookie;
    if (!token) {
      return res.status(401).json({ error: "Please login!" }); // 🔥 Fixed: Added return
    }

    console.log("Received Token:", token);

    const decodedToken = jwt.verify(token, "Kunalsingh");
    console.log("Decoded Token:", decodedToken);
      
    const { id } = decodedToken;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not found. Try Again" });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.log("Auth Error:", err);
    return res.status(401).json({ message: "Invalid or expired token. Please login again." });
  }
};

module.exports = userAuth
