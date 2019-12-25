const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");

// setup express
const app = express();
// create a web server; express typically does this behind the scenes, but socket.io expects the server to be passed to it
const server = http.createServer(app);
// config socketio to work with thte server, it nows supports websockets
const io = socketio(server);

const port = process.env.PORT;

// serve static files
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("new WebSocket connection");

  // send welcome msg to client
  socket.emit("message", "Welcome to my chat app");
  // send to everybody except the client emiting
  socket.broadcast.emit("message", "A new user has joined");

  // listen for client msg
  socket.on("sendMessage", (message, callback) => {
    // init bad words filter
    const filter = new Filter();
    // don't send the message if it contains profanity
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }
    // send msg to everyone
    io.emit("message", message);
    // acknowlegement message was send
    callback();
  });
  // listen for client location
  socket.on("sendLocation", (coords, callback) => {
    // send msg to everyone
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
    );
      // acknoledgement location was shared
    callback()
  });

  // send msg on disconnect
  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});

// app is up on http://localhost:3000/
server.listen(port, () => console.log(`Server is up on port ${port}!`));
