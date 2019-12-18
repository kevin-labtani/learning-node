const request = require("request");

const url =
  "https://api.darksky.net/forecast/a7107f851e36bca851ddb3e8a96c7799/50.4108,4.4446?units=si&lang=en";

// make the request and parse it as json
request({ url: url, json: true }, (error, response, body) => {
  console.log(
    `${body.daily.data[0].summary} It is currently ${
      body.currently.temperature
    } degrees out. There is a ${body.currently.precipProbability *
      100}% chance of rain.`,
  );
});
