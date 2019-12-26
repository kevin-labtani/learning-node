const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/users");

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
  socket.on("join", ({ username, room }, callback) => {
    // socket.id = unique id for a specific socket
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }
    // user.room is trimmed and lowercase version of room
    socket.join(user.room);

    socket.emit("message", generateMessage("Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(`${user.username} has joined!`));
    // acknowledge connection
    callback();
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
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.username} has left!`),
      );
    }
  });
});

// app is up on http://localhost:3000/
server.listen(port, () => console.log(`Server is up on port ${port}!`));
