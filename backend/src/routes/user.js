const express = require("express");
const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")
const userRouter = express.Router();

userRouter.get("/user/requests/pending", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "about",
      "skills",
    ]);

    if (!connectionRequest) {
      return res.status(400).json({
        message: "Cannot find the connection request",
      });
    }

    res.status(200).json({
      message: "SuccessFully fetched pending connection",
      data: connectionRequest,
    });
  } catch (err) {
    req.status(400).send("Error" + err.message);
  }
});



userRouter.get("/user/connection", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user
        const connectionRequests = await ConnectionRequest.find({
            $or : [
                {toUserId : loggedInUser._id, status: "accepted"},
                {fromUserId : loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", ["firstName", "lastName", "age", "skills", "about", "profileUrl"]).populate("toUserId",["firstName", "lastName", "age", "skills", "about", "profileUrl"] )

   const data = connectionRequests.map((row)=>{
    if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId
    }  
  return row.fromUserId
})
console.log(data)
   res.status(200).json({message : "Data feteched successfully", data:data})
    }catch(err){
        res.status(400).send({mesage:"Something went wrong", error: err.message})
    }
})



// userRouter.get("/feed", userAuth , async(req,res)=>{
//   try{
//     // user see all the user cards except
//     // his own cards
//     // ignored people
//     // already sent the connection request

//     const loggedInUser = request.user

//     const page = parseInt(req.query.page) || 1
//     let limit = parseInt(req.query.limit) || 10
//     limit = limit > 50 ? 50 : limit
//     const skip = (page - 1) * limit

//     const connectionRequest = await ConnectionRequest.find({
//       $or : [{fromUserId : loggedInUser}, {toUserId : loggedInUser}]
//     }).select("fromUserId toUserId")

//     const hideUserFromfeed = new Set()

//     connectionRequest.forEach((user) =>{
//       hideUserFromfeed.add(user.fromUserId.toString())
//       hideUserFromfeed.add(user.toUserId.to)
//     })
 
//     const UserForFeed = await User.find({
//       $and :[
//         {_id : {$nin : Array.from(hideUserFromfeed)}},
//         {_id : {$ne : loggedInUser._id}}
//       ]
//     }).select("firstName lastName age gender about skills").skip(skip).limit(limit)
//     console.log(UserForFeed)
//   res.send(UserForFeed)
     
 
//   }catch(err){
//     res.status(400).json({message : err.message})
//   }
// })

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log("in the feed api upper")

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName age gender about skills photoUrl")
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
    // console.log(users)
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});
module.exports = userRouter;
