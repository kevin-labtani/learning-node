const path = require("path");
const express = require("express");
const hbs = require("hbs");

// express is a function rather than an object
const app = express();

// define default port
const port = 3000;

// paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars as view engine
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// setup express to serve static file
app.use(express.static(publicDirectoryPath));

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
    title: "Help",
    name: "Kevin Labtani",
    helpText: "This is some helpful text.",
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

// start app with "nodemon src/app.js -e js,hbs"
