// connect to sockets.io client side
const socket = io();

// get data from server
socket.on("countUpdated", count => {
  console.log("the count has been updated", count);
});

// send data to server
document.querySelector("#increment").addEventListener("click", e => {
  console.log("clicked");
  socket.emit("increment");
});
