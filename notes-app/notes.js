const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your Notes...";
};
// read a single note
const readNote = title => {
  const notes = loadNotes();
  const noteToRead = notes.find(note => note.title === title);
  if (noteToRead) {
    console.log(chalk.inverse.bold(`${noteToRead.title}:`));
    console.log(noteToRead.body);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

// append new note to notes if it's unique
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
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
    console.log(chalk.bold(`${note.title}`));
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
  readNote,
};
