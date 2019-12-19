const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

// express is a function rather than an object
const app = express();

// define default port
// first part for heroku
const port = process.env.PORT || 3000;

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
  if (!req.query.address) {
    // return to stop the function to execute further
    return res.send({
      error: "You must provide an address",
    });
  }

  const address = req.query.address;
  // chain callbacks to get weather data from address geocode
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kevin Labtani",
    errorMessage: "Help article not found.",
  });
});

// 404
// need to come last!
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kevin Labtani",
    errorMessage: "Page not found.",
  });
});

// app is up on http://localhost:3000/
app.listen(port, () => console.log(`Server is up on port ${port}!`));