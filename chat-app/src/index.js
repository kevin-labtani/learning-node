const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

// setup express
const app = express();
// create a web server || express typically does this behind the scenes, but socket.io expects the server to be passed to it
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

  // listen for client msg
  socket.on("sendMessage", message => {
    io.emit("message", message);
  });
});

// app is up on http://localhost:3000/
server.listen(port, () => console.log(`Server is up on port ${port}!`));
