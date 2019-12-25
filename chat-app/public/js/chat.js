// connect to sockets.io client side
const socket = io();

// elements
const messageForm = document.querySelector("#message-form");
const messageFormInput = messageForm.querySelector("input");
const messageFormButton = messageForm.querySelector("button");
const locationButton = document.querySelector("#send-location");

// get message from server
socket.on("message", message => {
  console.log(message);
});

// send message to server
messageForm.addEventListener("submit", e => {
  e.preventDefault();
  // disable form until message is sent
  messageFormButton.setAttribute("disabled", "disabled");
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, error => {
    // reenable, clear and put focus on
    messageFormButton.removeAttribute("disabled");
    messageFormInput.value = "";
    messageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });
});

// send location
locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  // disable until location is sent
  locationButton.setAttribute("disabled", "disabled");

  // API doesn't support promises
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        // reenable
        locationButton.removeAttribute("disabled");
        console.log("Location shared!");
      },
    );
  });
});
