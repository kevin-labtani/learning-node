const form = document.querySelector("#message-form");

// connect to sockets.io client side
const socket = io();

// get message from server
socket.on("message", message => {
  console.log(message);
});

// send message to server
form.addEventListener("submit", e => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, error => {
    if (error) {
      return console.log(error);
    }
    console.log("Message delivered!");
  });
});

// send location
document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  // API doesn't support promises
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("Location shared!");
      },
    );
  });
});
