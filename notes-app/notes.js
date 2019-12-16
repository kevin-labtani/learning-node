const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your Notes...";
};

// append new note to notes if it's unique
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

// remove a note
const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("Note title not found!"));
  }
};

// list note

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your Notes:"));
  notes.forEach(note => {
    console.log(chalk.yellow.bold(`${note.title}: ${note.body}`));
  });
};

// write notes to notes.json
const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// open reads and parse our json
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    // if there's no data
    return [];
  }
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
};
