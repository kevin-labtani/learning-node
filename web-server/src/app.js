const express = require("express");

// express is a function rather than an object
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // send html
  res.send("<h1>Weather</h1>");
});

app.get("/help", (req, res) => {
  res.send([
    // express auto stringify and sends json
    {
      name: "Kevin",
      age: 37,
    },
    {
      name: "Sarah",
      age: 27,
    },
  ]);
});

app.get("/about", (req, res) => {
  res.send("<h1>About</H1>");
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "Sunny",
    location: "Nivelles",
  });
});

// app is up on http://localhost:3000/
app.listen(port, () => console.log(`Server is up on port ${port}!`));
