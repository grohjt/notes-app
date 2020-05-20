"use strict";

const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const editedElement = document.querySelector("#last-edited");
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (!note) {
  location.assign("index.html");
}

titleElement.value = note.title;
bodyElement.value = note.body;
editedElement.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener("change", (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  editedElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

bodyElement.addEventListener("change", (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  editedElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

document.querySelector("#remove-note").addEventListener("click", (e) => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    notes = getSavedNotes();
    note = notes.find((note) => note.id === noteId);

    if (!note) {
      location.assign("index.html");
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    editedElement.textContent = generateLastEdited(note.updatedAt);
  }
});
