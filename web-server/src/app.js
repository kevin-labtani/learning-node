const path = require("path");
const express = require("express");

// express is a function rather than an object
const app = express();

const port = 3000;

// setup to serve static file
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  res.send({
    forecast: "Sunny",
    location: "Nivelles",
  });
});

// app is up on http://localhost:3000/
app.listen(port, () => console.log(`Server is up on port ${port}!`));
