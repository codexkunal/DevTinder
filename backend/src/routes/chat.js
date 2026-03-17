const express = require("express");
const chatRouter = express.Router();
const userAuth = require("../middleware/auth");
const { Chat } = require("../models/chat");

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetUserId } = req.params;

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "message.senderId",
      select: "firstName lastName profileUrl",
    });

    if (!chat) {
      chat = { message: [] };
    }

    res.json(chat);
  } catch (err) {
    console.error("Error fetching chat:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = chatRouter;
