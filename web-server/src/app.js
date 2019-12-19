const path = require("path");
const express = require("express");

// express is a function rather than an object
const app = express();

const port = 3000;

// setup to serve static file
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

// set handlebars as view engine
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  // render our handlebars template
  res.render("index", {
    title: "Weather",
    name: "Kevin Labtani",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kevin Labtani",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text."
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "Sunny",
    location: "Nivelles",
  });
});

// app is up on http://localhost:3000/
app.listen(port, () => console.log(`Server is up on port ${port}!`));
