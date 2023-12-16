export class Theme {
  $element;

  constructor(element: HTMLInputElement) {
    this.$element = element;
    this.setEvents();
  }

  setEvents() {
    this.$element.addEventListener("change", (e) => {
      document.documentElement.setAttribute(
        "theme",
        (e.target as HTMLInputElement).checked ? "dark-mode" : "",
      );
    });
  }
}
