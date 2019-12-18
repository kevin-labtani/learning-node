const request = require("request");

// weather with darksky api
const url =
  "https://api.darksky.net/forecast/a7107f851e36bca851ddb3e8a96c7799/50.4108,4.4446?units=si&lang=en";

// make the request and parse it as json
request({ url: url, json: true }, (error, response, body) => {
  if (error) {
    console.log("unable to connect to weather service!");
  } else if (body.error) {
    console.log("Unable to find location!");
  } else {
    console.log(
      `${body.daily.data[0].summary} It is currently ${
        body.currently.temperature
      } degrees out. There is a ${body.currently.precipProbability *
        100}% chance of rain.`,
    );
  }
});

// geocoding with mapbox api
const geocodeURL =
  "http://api.mapbox.com/geocoding/v5/mapbox.places/charleroi.json?access_token=pk.eyJ1Ijoia2V2aW5sYWJ0YW5pIiwiYSI6ImNrNGI0a2JsajA0eDAzanBpcm5uM3hrbzEifQ.VeXmb1HhNctRoyPkR8_odA&limit=1";

// make the request and parse it as json
request({ url: geocodeURL, json: true }, (error, response, body) => {
  if (error) {
    console.log("unable to connect to location services!");
  } else if (!body.features[0]) {
    console.log("Unable to find location. Try another search.");
  } else {
    const latitude = body.features[0].center[1];
    const longitude = body.features[0].center[0];
    console.log(`long: ${longitude}, lat: ${latitude}`);
  }
});
