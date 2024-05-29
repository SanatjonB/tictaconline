const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const { log } = require("util");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "https://tic-tac-toe-front-end-one.vercel.app",
    method: ["GET", "POST"],
  },
});

const port = 5000;
app.use(cors());

app.get("/game", (req, res) => {
  res.status(200).send("TIC Tac Toe Game Server");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("makeMove", (data) => {
    io.emit("moveMade", data);
  });
  socket.on("resetGame", (newGame) => {
    io.emit("gameReset", newGame);
  });
  socket.on("disconnect", () => {
    console.log("UserDisconnected");
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
