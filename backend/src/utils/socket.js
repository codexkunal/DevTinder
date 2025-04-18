const socket = require('socket.io')
const crypto = require("crypto");

const getSecretRoomId = (userId, targetUserId) => {
    return crypto
      .createHash("sha256")
      .update([userId, targetUserId].sort().join("$"))
      .digest("hex");
  };

const initialize = (server) => {
    const io = socket(server, {
      cors:{
        origin : "https://dev-tinder-sandy.vercel.app",
        methods: ["GET", "POST"],
    credentials: true
      }
    })

    io.on('connection', (socket)=>{
        // Event Handler
        socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
            const roomId = getSecretRoomId(userId, targetUserId);
            console.log(firstName + " joined Room : " + roomId);
            socket.join(roomId);
          });

        socket.on("sendMessage", ({
          firstName , userId, targetUserId,  text
        })=>{
          const roomId =  getSecretRoomId(userId, targetUserId);
          console.log(firstName + " " +  text + roomId)
          io.to(roomId).emit("messageReceived", {firstName, text})
        })

        socket.on("disconnect", ()=>{
            
        })
    })
    
}

module.exports = initialize