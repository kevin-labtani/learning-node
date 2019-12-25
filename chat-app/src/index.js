const path = require("path");
const express = require("express");

// setup express
const app = express();

const port = process.env.PORT;

// serve static files
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

// app is up on http://localhost:3000/
app.listen(port, () => console.log(`Server is up on port ${port}!`));
