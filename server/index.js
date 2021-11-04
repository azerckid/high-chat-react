const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
server.listen(3001, () => {
  console.log("\x1b[33m%s\x1b[0m", "Server started on port 3001");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("\x1b[36m", ">> user connected : " + socket.id);
  socket.on("disconnect", () => {
    console.log("\x1b[31m", ">> user disconnected : " + socket.id);
  });

  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    console.log(
      "user joined room name : " + roomName + "    userID : " + socket.id
    );
  });

  socket.on("sendMessage", (messageData) => {
    console.log(
      "\x1b[32m",
      ">> message sent : " +
        messageData.message +
        "    userID : " +
        socket.id +
        "    room : " +
        messageData.room +
        "    time : " +
        messageData.time
    );

    socket.to(messageData.room).emit("receiveMessage", messageData);
  });
});
