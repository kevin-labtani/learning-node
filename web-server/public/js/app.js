const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

// use fetch to get weather
const getWeather = location => {
  return fetch(`/weather?address=${location}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
};

// set up form to get location from user input
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "loading...";
  messageTwo.textContent = "";
  getWeather(location);
});
