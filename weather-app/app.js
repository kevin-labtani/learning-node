const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("Charleroi", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

forecast(50.4108, 4.4446, (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
