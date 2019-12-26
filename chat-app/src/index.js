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
    // send welcome message to user
    socket.emit("message", generateMessage("Admin", "Welcome!"));
    // notify all exisitn users of new user join
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage("Admin", `${user.username} has joined!`),
      );
    // send room name and user list
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    // acknowledge connection
    callback();
  });

  // listen for client msg
  socket.on("sendMessage", (message, callback) => {
    // get user so we send msg to correct room
    const user = getUser(socket.id);

    // init bad words filter
    const filter = new Filter();
    // don't send the message if it contains profanity
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }

    io.to(user.room).emit("message", generateMessage(user.username, message));
    // acknowlegement message was send
    callback();
  });

  // listen for client location
  socket.on("sendLocation", (coords, callback) => {
    // get user so we send msg to correct room
    const user = getUser(socket.id);

    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
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
      // inform room user has left
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username} has left!`),
      );
      // send updated room name and user list
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// app is up on http://localhost:3000/
server.listen(port, () => console.log(`Server is up on port ${port}!`));
