export default class Keyboard {
  $fontSelectEl: HTMLSelectElement;

  constructor() {
    this.setElements();
    this.setEvents();
  }

  setElements() {
    this.$fontSelectEl = document.querySelector("[name='font']");
  }

  setEvents() {
    this.$fontSelectEl.addEventListener("change", (e) => {
      document.body.style.fontFamily = (e.target as HTMLSelectElement).value;
    });
  }
}
