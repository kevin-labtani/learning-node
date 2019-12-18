const https = require("https");
// different libraries for http, http/2 and https, kind of a pain
const url =
  "https://api.darksky.net/forecast/a7107f851e36bca851ddb3e8a96c7799/50.4108,4.4446?units=auto";

const request = https.request(url, response => {
  let data = "";

  response.on("data", chunk => {
    data += chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", error => {
  console.log("An error", error);
});

request.end();
