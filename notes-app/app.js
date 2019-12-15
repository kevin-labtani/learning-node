const chalk = require("chalk");
const getNotes = require("./notes.js");

const msg = getNotes();

console.log(msg);

console.log(chalk.black.bgRed.bold("Success!"));
// npm install -g nodemon
// nodemon app.js
// Just use nodemon instead of node to run your code, and now your process will automatically restart when your code changes.
