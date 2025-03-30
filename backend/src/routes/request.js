const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const userAuth = require("../middleware/auth");
const express = require("express");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    //   console.log(typeof userAuth)
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const statusAllowed = ["interested", "ignored"];

      const isStatusAllowed = statusAllowed.includes(status);

      if (!isStatusAllowed) {
        return res
          .status(400)
          .json({ message: "Invalid status type" + status });
      }

      const toUserData = await User.findById(toUserId);
      if (!toUserData) {
        return res.status(400).json({ message: "user not found" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exist" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });

      const connectionRequestObject = await connectionRequest.save();

      res.json({
        message: "connestion Request Made Successfully",
        data: connectionRequestObject,
      });
    } catch (err) {
      res
        .status(400)
        .send("Something went Wrong while making the connnection Request");
    }
  }
);

requestRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async (req, res) => {
      try {   
        const status = req.params.status;
        const _id = req.params.requestId;
        const loggedInUser = req.user;
  
        if (!["rejected", "accepted"].includes(status)) {
          return res.status(400).json({ message: "Invalid Request" });
        }
  
        const requestedUserObject = await ConnectionRequest.findOne({
          _id: _id,
          toUserId: loggedInUser._id,
          status : "interested" // Fetch without status condition
        });
  
        if (!requestedUserObject) {
          return res.status(400).json({ message: "Connection Request is Invalid" });
        }
  
        requestedUserObject.status = status;
        const updatedUserObject = await requestedUserObject.save();
  
        res.json({
          message: `Connection Request ${status}`,
          data: updatedUserObject,
        });
      } catch (err) {
        console.error("Error:", err); // Log full error in console
        res.status(500).json({ message: "Something went wrong", error: err.message });
      }
    }
  );
  

module.exports = requestRouter;
