const fs = require("fs");

const getNotes = function() {
  return "Your Notes...";
};

// append new note to notes if it's unique
const addNote = function(title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body,
    });

    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title taken!");
  }
};

// write notes to notes.json
const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// open reads and parse our json
const loadNotes = function() {
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
};
