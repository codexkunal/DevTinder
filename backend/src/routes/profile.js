const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt")
const  userAuth  = require("../middleware/auth");
const User = require("../models/user");
const { validateProfileUpdateDate } = require("../utils/validation");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Something went wrong. Please try again.");
  }
});

// API for Getting the All the user From Database
// profileRouter.get("/feed", async (req, res) => {
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
profileRouter.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findOneAndDelete(userId);
    res.send("user deleted Successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// API For updating the user by id
profileRouter.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  if (data.email) {
    delete data.email;
  }

  try {
    const updateUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    res.send(updateUser);
    console.log(updateUser);
  } catch (err) {
    res.status(404).send("Something went wrong" + err);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    console.log("in the edit route")
    const dataToBeUpdated = req.body;
    console.log(dataToBeUpdated , "this is data to be checked")
    const isAllowedToEdit = validateProfileUpdateDate(dataToBeUpdated);
    if (!isAllowedToEdit) {
      throw new Error("Request Data is not editable");
    }
    const userData = req.user;
    Object.keys(dataToBeUpdated).forEach(
      (key) => (userData[key] = dataToBeUpdated[key])
    );
    // console.log(userData);
    await userData.save();
    res.json({
      message: `${userData.firstName}, your profile updated successfuly`,
      data: userData,
    });
  } catch (err) {
    res
      .status(400)
      .send("some went wrong while editing the user profile" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth , async (req,res)=>{
   try {
    const  userObj = req.body.password

    // console.log("old password" , userObj);
    
    const user = req.user
    if(!user){
        throw new Error("User not logged in");
    }

    const hashPassword = await bcrypt.hash(userObj, 10)

    user.password = hashPassword

    await user.save()

    // console.log("new password" + user.password);
    res.status(200).send("User password update successfully")
    
}catch(err){
    res.status(400).send("Something went wrong while updating the password" + err.message)
}
})


module.exports = profileRouter;
