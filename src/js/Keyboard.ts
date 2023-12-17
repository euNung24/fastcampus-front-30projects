export default class Keyboard {
  $container: HTMLDivElement;
  $switchThemeEl: HTMLInputElement;
  $fontSelectEl: HTMLSelectElement;

  constructor() {
    this.setElements();
    this.setEvents();
  }

  setElements() {
    this.$container = document.querySelector(".container");
    this.$switchThemeEl = this.$container.querySelector("[name='theme']");
    this.$fontSelectEl = this.$container.querySelector("[name='font']");
  }

  setEvents() {
    this.$switchThemeEl.addEventListener("change", this.onChangeTheme);
    this.$fontSelectEl.addEventListener("change", this.onChangeFont);
  }

  onChangeTheme(e: Event) {
    document.documentElement.setAttribute(
      "theme",
      (e.target as HTMLInputElement).checked ? "dark-mode" : "",
    );
  }

  onChangeFont(e: Event) {
    document.body.style.fontFamily = (e.target as HTMLSelectElement).value;
  }
}
