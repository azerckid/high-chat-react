const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
server.listen(3001, () => {
  console.log("✅ Server started on port 3001");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 user connected : " + socket.id);
  socket.on("disconnect", () => {
    console.log("🅾️ user disconnected : " + socket.id);
  });

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("🔵 user joined room : " + data + "    userID : " + socket.id);
  });
});
