const request = require("request");

// weather with darksky api
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/a7107f851e36bca851ddb3e8a96c7799/${latitude},${longitude}?units=si&lang=en`;

  // make the request and parse it as json
  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        } degrees out. There is a ${body.currently.precipProbability *
          100}% chance of rain.`,
      );
    }
  });
};

module.exports = forecast;

// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });
