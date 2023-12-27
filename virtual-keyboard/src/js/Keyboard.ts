export default class Keyboard {
  $container: HTMLDivElement;
  $switchThemeEl: HTMLInputElement;
  $fontSelectEl: HTMLSelectElement;
  $keyboardEl: HTMLDivElement;
  $inputEl: HTMLInputElement;
  $errorEl: HTMLParagraphElement;
  koreanRegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  language = "english";
  isShiftPress = false;
  keyDown = false;
  mouseDown = false;

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

  changeLanguage() {
    this.language = this.language === "english" ? "korean" : "english";
    this.$keyboardEl.setAttribute("data-type", this.language);
  }

  changeType() {
    this.isShiftPress = !this.isShiftPress;
    this.$keyboardEl.setAttribute(
      "data-type",
      `${this.language}${this.isShiftPress ? "-shift" : ""}`,
    );
  }

  onKeyDown(e: KeyboardEvent) {
    if (this.mouseDown) return;
    this.keyDown = true;

    let keyEl: HTMLElement;
    if (e.key === '"') {
      keyEl = this.$keyboardEl.querySelector(`[data-key='"']`);
    } else if (e.key === "\\") {
      keyEl = this.$keyboardEl.querySelector(`[data-key="\"]`);
    } else {
      keyEl =
        this.$keyboardEl.querySelector(`[data-key="${e.key}"]`) ||
        this.$keyboardEl.querySelector(`[data-key="${e.code}"]`);
    }

    keyEl?.closest(".keyBox").classList.add("active");

    if (e.key.includes("Shift")) {
      this.changeType();
    } else if (e.key === "CapsLock") {
      this.changeLanguage();
    } else if (e.key.includes("Backspace")) {
      this.$inputEl.value = this.$inputEl.value.slice(0, -1);
    } else if (e.key.includes("Space")) {
      this.$inputEl.value += " ";
    } else {
      keyEl &&
        (this.$inputEl.value += keyEl.dataset.key.replace(
          this.koreanRegExp,
          "",
        ));
    }

    this.$errorEl.classList.toggle(
      "error",
      this.koreanRegExp.test(e.key) || Boolean(!keyEl),
    );
  }

  onKeyUp(e: KeyboardEvent) {
    if (this.mouseDown) return;
    this.keyDown = false;

    const keyEl =
      this.$keyboardEl.querySelector(`[data-key="${e.key}"]`) ||
      this.$keyboardEl.querySelector(`[data-key="${e.code}"]`);

    keyEl?.closest(".keyBox").classList.remove("active");
  }

  onMouseDown(e: Event) {
    if (this.keyDown) return;
    this.mouseDown = true;

    const target = e.target as HTMLElement;
    if (target.dataset.key === "CapsLock") {
      this.changeLanguage();
      return;
    }
    if (target.dataset.key?.includes("Shift")) {
      this.changeType();
      return;
    }
    if (target.dataset.key?.includes("Back")) {
      this.$inputEl.value = this.$inputEl.value.slice(0, -1);
      return;
    }

    const keyBoxEl = target.closest(".keyBox");
    keyBoxEl?.classList.add("active");
    const type = this.$keyboardEl.dataset.type;
    const keyEl = keyBoxEl?.querySelector(`[data-type=${type}]`) as HTMLElement;
    if (keyEl) {
      this.$inputEl.value += keyEl.dataset.key.replace(this.koreanRegExp, "");
    } else if (keyBoxEl) {
      this.$inputEl.value += target.dataset.key;
    }

    this.$errorEl.classList.toggle(
      "error",
      this.koreanRegExp.test(target.dataset.key) || Boolean(!keyEl),
    );
  }

  onMouseUp(e: Event) {
    if (this.keyDown) return;
    this.mouseDown = false;

    this.$keyboardEl.querySelector(".active").classList.remove("active");
  }
}
