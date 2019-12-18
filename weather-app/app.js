const request = require("request");

const url =
  "https://api.darksky.net/forecast/a7107f851e36bca851ddb3e8a96c7799/37.8267,-122.4233";

request({ url }, (error, response, body) => {
  const data = JSON.parse(body);
  console.log(data);
});
