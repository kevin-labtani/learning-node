// use fetch to gt wezther
const getWeather = location => {
  return fetch(`http://localhost:3000/weather?address=${location}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.location);
        console.log(data.forecast);
      }
    });
};

// set up form to get location from user input
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  getWeather(location);
});
