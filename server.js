const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "https://tic-tac-toe-front-end-one.vercel.app",
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 5000;
app.use(cors());

let game = {
  board: Array(9).fill(null),
  currentPlayer: "X",
};

app.get("/game", (req, res) => {
  res.status(200).send("TIC Tac Toe Game Server");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("gameReset", game);

  socket.on("makeMove", (data) => {
    game = data.updatedGame;
    io.emit("moveMade", data);
  });

  socket.on("resetGame", (newGame) => {
    game = newGame;
    io.emit("gameReset", newGame);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
