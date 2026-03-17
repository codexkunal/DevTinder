const io = require("socket.io-client");

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected with ID:", socket.id);
  
  const userId = "60d5ec496f8c2b3f1cbf5a11";
  const targetUserId = "60d5ec496f8c2b3f1cbf5a22";

  console.log("Joining chat room...");
  socket.emit("joinChat", {
    firstName: "Test",
    userId,
    targetUserId
  });

  setTimeout(() => {
    console.log("Sending message...");
    socket.emit("sendMessage", {
      firstName: "Test",
      userId,
      targetUserId,
      text: "Hello World",
    });
  }, 1000);
});

socket.on("messageReceived", (data) => {
  console.log("SUCCESS! messageReceived:", data);
  process.exit(0);
});

setTimeout(() => {
  console.log("Timeout! Did not receive message.");
  process.exit(1);
}, 5000);
