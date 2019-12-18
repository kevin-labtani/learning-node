const request = require("request");

// geocoding with mapbox api
const geocode = (address, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2V2aW5sYWJ0YW5pIiwiYSI6ImNrNGI0a2JsajA0eDAzanBpcm5uM3hrbzEifQ.VeXmb1HhNctRoyPkR8_odA&limit=1`;

  // make the request and parse it as json
  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (!body.features[0]) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
