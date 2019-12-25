const form = document.querySelector("#message-form");

// connect to sockets.io client side
const socket = io();

// get data from server
socket.on("message", message => {
  console.log(message);
});

// send data to server
form.addEventListener("submit", e => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message);
});
