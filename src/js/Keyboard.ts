export default class Keyboard {
  $container: HTMLDivElement;
  $switchThemeEl: HTMLInputElement;
  $fontSelectEl: HTMLSelectElement;
  $keyboardEl: HTMLDivElement;
  $inputEl: HTMLInputElement;
  $errorEl: HTMLParagraphElement;
  koreanRegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  constructor() {
    this.setElements();
    this.setEvents();
  }

  setElements() {
    this.$container = document.querySelector(".container");
    this.$switchThemeEl = this.$container.querySelector("[name='theme']");
    this.$fontSelectEl = this.$container.querySelector("[name='font']");
    this.$keyboardEl = this.$container.querySelector(".keyboardBox");
    this.$inputEl = this.$container.querySelector("[name=value]");
    this.$errorEl = this.$container.querySelector(".message");
  }

  setEvents() {
    this.$switchThemeEl.addEventListener("change", this.onChangeTheme);
    this.$fontSelectEl.addEventListener("change", this.onChangeFont);
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
    this.$inputEl.addEventListener("input", this.onChangeInput.bind(this));
    this.$keyboardEl.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mouseup", this.onMouseUp.bind(this));
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

  onKeyDown(e: KeyboardEvent) {
    const value = e.key.toUpperCase();
    this.$keyboardEl
      .querySelector(`[data-key=${value}]`)
      ?.closest(".keyBox")
      .classList.add("active");
    this.$errorEl.classList.toggle("error", this.koreanRegExp.test(value));
  }

  onKeyUp(e: KeyboardEvent) {
    this.$keyboardEl
      .querySelector(`[data-key=${e.key.toUpperCase()}]`)
      ?.closest(".keyBox")
      .classList.remove("active");
  }

  onChangeInput(e: Event) {
    const el = e.target as HTMLInputElement;
    el.value = el.value.replace(this.koreanRegExp, "");
  }

  onMouseDown(e: Event) {
    const el = e.target as HTMLElement;
    const keyBoxEl = el.closest(".keyBox");
    keyBoxEl?.classList.add("active");
    const enEl = keyBoxEl?.lastElementChild as HTMLElement | null;
    enEl && (this.$inputEl.value += enEl.dataset.key);
  }

  onMouseUp(e: Event) {
    const el = e.target as Element;
    el.closest(".keyBox")?.classList.remove("active");
  }
}
