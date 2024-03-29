import { makeObservable, observable, action, autorun } from "mobx";
import { v1 as uuidv1 } from "uuid";
class StickyNoteModel {
  id = uuidv1();
  content = "";
  width = 250;
  height = 300;
  x = 0;
  y = 0;

  constructor() {
    makeObservable(this, {
      content: observable,
      width: observable,
      height: observable,
      x: observable,
      y: observable,
    });
  }
}

export default class StickyNoteStore {
  id = "stickyNoteStore";
  localStorage = null;
  notes = [];
  constructor() {
    makeObservable(this, {
      notes: observable,
      addNote: action,
      editNote: action,
      resizeNote: action,
      changeNotePos: action,
      deleteNote: action,
    });
    this.initLocalStorage();
    autorun(() => {
      if (this.localStorage) {
        this.localStorage.setItem(this.id, JSON.stringify(this.notes));
      }
    });
  }

  getNoteIndex(id) {
    return this.notes.findIndex((note) => note.id === id);
  }

  addNote() {
    this.notes.push(new StickyNoteModel());
  }

  editNote(id, content) {
    this.notes[this.getNoteIndex(id)].content = content;
  }

  resizeNote(id, [width, height]) {
    this.notes[this.getNoteIndex(id)].width = width;
    this.notes[this.getNoteIndex(id)].hegith = height;
  }

  changeNotePos(id, [x, y]) {
    this.notes[this.getNoteIndex(id)].x = x;
    this.notes[this.getNoteIndex(id)].y = y;
  }

  deleteNote(id) {
    this.notes.splice(this.getNoteIndex(id), 1);
  }

  initLocalStorage() {
    if (localStorage.getItem(this.id) === null) {
      this.localStorage = localStorage;
      this.localStorage.setItem(this.id, JSON.stringify(this.notes));
    } else {
      this.localStorage = window.localStorage;
      this.storeLocalStorage();
    }
  }

  storeLocalStorage() {
    this.notes = JSON.parse(this.localStorage.getItem(this.id));
  }
}
