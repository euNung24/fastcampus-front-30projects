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
    });
  }

  addNote() {
    this.notes.push(new StickyNoteModel());
  }
}
