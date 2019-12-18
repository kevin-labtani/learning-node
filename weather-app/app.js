const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// get location from command line
const address = process.argv[2];
if (!address) {
  return console.log(
    'please provide an address as an argument, eg: "node app.js Boston"',
  );
}

// chain callbacks to get weather data from address geocode
geocode(address, (error, { latitude, longitude, location } = {}) => {
  if (error) {
    // return statement to exit
    return console.log("Error", error);
  }

  forecast(latitude, longitude, (error, forecastData) => {
    if (error) {
      return console.log("Error", error);
    }
    console.log(location);
    console.log(forecastData);
  });
});
