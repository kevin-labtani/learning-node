const request = require("request");
const geocode = require("./utils/geocode");

// // weather with darksky api
// const url =
//   "https://api.darksky.net/forecast/a7107f851e36bca851ddb3e8a96c7799/50.4108,4.4446?units=si&lang=en";

// // make the request and parse it as json
// request({ url: url, json: true }, (error, response, body) => {
//   if (error) {
//     console.log("unable to connect to weather service!");
//   } else if (body.error) {
//     console.log("Unable to find location!");
//   } else {
//     console.log(
//       `${body.daily.data[0].summary} It is currently ${
//         body.currently.temperature
//       } degrees out. There is a ${body.currently.precipProbability *
//         100}% chance of rain.`,
//     );
//   }
// });

geocode("Charleroi", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});
