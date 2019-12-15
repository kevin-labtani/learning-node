const chalk = require("chalk");
const getNotes = require("./notes.js");

const command = process.argv[2]; // node app.js add => we get 'add'

if (command === "add") {
  console.log("Adding note!");
} else if (command === "remove") {
  console.log("removing note!");
}
