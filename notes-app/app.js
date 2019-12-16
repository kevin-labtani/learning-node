const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// node app.js --help provided by yargs

// customize yargs version
yargs.version("1.1.0");

// create add command
// call with node app.js add --title="some title" --body="some body"
// builder set up option for command
// handler called when command is run
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
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  handler() {
    notes.readNote();
  },
});

// create list command
yargs.command({
  command: "list",
  describe: "Listing all your notes",
  handler() {
    notes.listNotes();
  },
});

// create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// need to tell yeargs to do it's thing
// console.log(yargs.argv); used to do it
yargs.parse();
