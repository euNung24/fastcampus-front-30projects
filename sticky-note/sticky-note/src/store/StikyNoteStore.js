import { makeObservable, observable, action } from "mobx";
import { v1 as uuidv1 } from "uuid";
class StickyNoteModel {
  id = uuidv1;
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
  notes = [];
  constructor() {
    makeObservable(this, {
      notes: observable,
      addNote: action,
      editNote: action,
      resizeNote: action,
      changeNotePos: action,
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
}
