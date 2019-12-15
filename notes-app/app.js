const chalk = require("chalk");
const yargs = require("yargs");
const getNotes = require("./notes.js");

// node app.js --help provided by yargs

// customize yargs version
yargs.version("1.1.0");

// create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  // handler called when we use the function
  handler: function() {
    console.log("Adding a new note!");
  },
});

// create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  // handler called when we use the function
  handler: function() {
    console.log("Reading a new note!");
  },
});

// create list command
yargs.command({
  command: "list",
  describe: "Listing all your notes",
  // handler called when we use the function
  handler: function() {
    console.log("Listing out your notes!");
  },
});

// create read command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  // handler called when we use the function
  handler: function() {
    console.log("Removing a new note!");
  },
});

// node app.js add --title="things to buy"
console.log(yargs.argv);
// { _: [ 'add' ], title: 'things to buy', '$0': 'app.js' }
