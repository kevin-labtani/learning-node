const express = require("express");

// express is a function rather than an object
const app = express();
const port = 3000;

// app.com is our domain
// app.com/help
// app.com/about
// etc

app.get("/", (req, res) => res.send("Hello Express!"));

app.get("/help", (req, res) => res.send("This is the help page!"));

app.get("/about", (req, res) => {
  res.send("About");
});

app.get("/weather", (req, res) => {
  res.send("Your weather");
});

// app is up on http://localhost:3000/
app.listen(port, () => console.log(`Server is up on port ${port}!`));
