// connect to sockets.io client side
const socket = io();

// elements
const messageForm = document.querySelector("#message-form");
const messageFormInput = messageForm.querySelector("input");
const messageFormButton = messageForm.querySelector("button");
const locationButton = document.querySelector("#send-location");
const messages = document.querySelector("#messages");

// templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector(
  "#location-message-template",
).innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

// options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// get message from server
socket.on("message", message => {
  // setup mustache template to print the messages
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

// get locationMessage from server
socket.on("locationMessage", message => {
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

// get room data
socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  document.querySelector("#sidebar").innerHTML = html;
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

// tell server to join a specific room as "username"
socket.emit("join", { username, room }, error => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
