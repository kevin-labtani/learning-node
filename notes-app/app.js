const chalk = require("chalk");
const yargs = require("yargs");
const getNotes = require("./notes.js");

// node app.js --help provided by yargs

// customize yargs version
yargs.version("1.1.0");

// create add command
// call with node app.js add --title="Shopping list" --body="buy soap"
// builder set up option for command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function(argv) {
    console.log(`Title: ${argv.title}`);
    console.log(`Body: ${argv.body}`);
  },
});

// create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function() {
    console.log("Reading a new note!");
  },
});

// create list command
yargs.command({
  command: "list",
  describe: "Listing all your notes",
  handler: function() {
    console.log("Listing out your notes!");
  },
});

// create read command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  handler: function() {
    console.log("Removing a new note!");
  },
});

// need to tell yeargs to do it's thing
// console.log(yargs.argv); used to do it
yargs.parse();
