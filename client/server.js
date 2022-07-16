const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const socket = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

let players = [];
let playerOneChoice = "";
let playerTwoChoice = "";
let result = "";

server.listen(5000, () => {
  console.log('listening on 5000');
});

const getWinner = (playerOneChoice, playerTwoChoice) => {
  if (playerOneChoice === playerTwoChoice) {
    result = 'draw';
  } else if (playerOneChoice === "rock") {
    if (playerTwoChoice === "paper") {
      result = "playerTwoWins";
    } else {
      result = "playerOneWins";
    }
  } else if (playerOneChoice === "paper") {
    if (playerTwoChoice === "scissors") {
      result = "playerTwoWins";
    } else {
      result = "playerOneWins";
    }
  } else if (playerOneChoice === "scissors") {
    if (playerTwoChoice === "rock") {
      result = "playerTwoWins";
    } else {
      result = "playerOneWins";
    }
  }

  return result;
}

const resolve = roomId => {
  const winner = getWinner(playerOneChoice, playerTwoChoice);
  socket.sockets.to(roomId).emit("result", {
    winner,
    playerOneChoice,
    playerTwoChoice,
  });
  playerOneChoice = "";
  playerTwoChoice = "";
  result = "";
}

socket.on('connection', (socket) => {
  socket.on("createRoom", (name, roomId) => {
    console.log('createRoom', roomId);
    players.push({
      socket: socket.id,
      name,
      roomId,
    })
    socket.join(roomId);
    socket.emit("newGame", name, roomId);
  });

  socket.on("joinRoom", (name, roomId) => {
    if (roomId) {
      socket.join(roomId);
      players.push({
        socket: socket.id,
        name,
        roomId,
      });
      socket.broadcast.to(roomId).emit("playerOne", players[0]?.name);
      socket.emit("playerTwo", (players[1]?.name, roomId));
      console.log('players', players);
    }
  });

  socket.on("joinedRoom", (name, roomId) => {
    socket.broadcast.to(roomId).emit(name, " has joined the game.");
  });

  socket.on("choiceSelected", ({ room, choice, type }) => {
    if (choice.length) {
      type === 'PlayerOne' ? playerOneChoice = choice : playerTwoChoice = choice;
      console.log(playerOneChoice, playerTwoChoice);
      resolve(room);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});