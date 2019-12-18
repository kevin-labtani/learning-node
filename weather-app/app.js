const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];
if (!address) {
  return console.log(
    'please provide an address as an argument, eg: "node app.js Boston"',
  );
}
geocode(address, (error, data) => {
  if (error) {
    // return statement to exit
    return console.log("Error", error);
  }

  forecast(data.latitude, data.longitude, (error, forecastData) => {
    if (error) {
      return console.log("Error", error);
    }
    console.log(data.location);
    console.log(forecastData);
  });
});
