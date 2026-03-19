const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initialize = (server) => {
  const io = socket(server, {
    cors: {
      origin: "https://dev-tinder-sandy.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // Event Handler
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName + " joined Room : " + roomId);
      socket.join(roomId);
    });

    socket.on("joinPersonalRoom", ({ userId }) => {
      console.log("User joined personal room: user_" + userId);
      socket.join("user_" + userId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " " + text + roomId);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              message: [],
            });
          }

          // Push and save the chat to get the auto-generated timestamp
          chat.message.push({
            senderId: userId,
            text,
          });

          try {
            await chat.save();
            console.log("Chat saved successfully.");
          } catch (saveErr) {
            console.error("CRITICAL ERROR saving chat to DB:", saveErr);
            throw saveErr;
          }
          
          // Retrieve the newly added message to get its createdAt timestamp
          const newMessage = chat.message[chat.message.length - 1];

          io.to(roomId).emit("messageReceived", { 
            firstName, 
            text, 
            createdAt: newMessage.createdAt 
          });

          console.log(`Emitting global notification to: user_${targetUserId} from: ${userId}`);
          
          // Also emit to the target user's personal room for global notifications
          io.to("user_" + targetUserId).emit("newMessageNotification", {
            fromUserId: userId,
            firstName
          });
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {});
  });

  return io;
};

module.exports = initialize;
