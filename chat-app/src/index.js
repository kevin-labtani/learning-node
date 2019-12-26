const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

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

// socket.emit send message to  client
// socket.broadcast.emit sends message to everybody except client
// io.emit sends message to everybody
// io.to.emit emits an event to everybody in a specific room
// socket.broadcast.to.emit emits an event to everybody in a specific room except for the client
io.on("connection", socket => {
  console.log("new WebSocket connection");

  // join user to "room" as "username"
  socket.on("join", ({ username, room }) => {
    socket.join(room);

    socket.emit("message", generateMessage("Welcome to my chat app"));
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(`${username} has joined!`));
  });

  // listen for client msg
  socket.on("sendMessage", (message, callback) => {
    // init bad words filter
    const filter = new Filter();
    // don't send the message if it contains profanity
    if (filter.isProfane(message)) {
      return callback(generateMessage("Profanity is not allowed"));
    }
    io.to("1").emit("message", generateMessage(message));
    // acknowlegement message was send
    callback();
  });

  // listen for client location
  socket.on("sendLocation", (coords, callback) => {
    // send msg to everyone
    io.emit(
      "locationMessage",
      generateLocationMessage(
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
      ),
    );
    // acknoledgement location was shared
    callback();
  });

  // send msg on disconnect
  socket.on("disconnect", () => {
    io.emit("message", generateMessage("A user has left!"));
  });
});

// app is up on http://localhost:3000/
server.listen(port, () => console.log(`Server is up on port ${port}!`));
