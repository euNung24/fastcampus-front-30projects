import "@fortawesome/fontawesome-free/js/all.min.js";
import "../scss/style.scss";

interface FormElements extends HTMLFormElement {
  content: HTMLInputElement;
}

class TodoList {
  wrapperEl: HTMLDivElement;
  inputFormEl: HTMLFormElement;
  inputEl: HTMLInputElement;
  addBtnEl: HTMLButtonElement;
  todoContainerEl: HTMLDivElement;
  todoListEl: HTMLDivElement;

  constructor() {
    this.setElements();
    this.setEvents();
  }

  setElements() {
    this.wrapperEl = document.querySelector("#input-container");
    this.inputFormEl = this.wrapperEl.querySelector("#input-area");
    this.inputEl = this.inputFormEl.querySelector("#todo-input");
    this.addBtnEl = this.inputFormEl.querySelector("#add-btn");
    this.todoContainerEl = document.querySelector("#todo-container");
    this.todoListEl = this.todoContainerEl.querySelector("#todo-list");
  }

  setEvents() {
    this.inputFormEl.addEventListener("submit", this.onAddTodo.bind(this));
    this.todoListEl.addEventListener("click", this.onClickTodoList.bind(this));
  }

  onClickTodoList(e: Event) {
    const buttonEl = (e.target as HTMLElement).closest("button");

    if (!buttonEl) return;

    const todoEl: HTMLFormElement = buttonEl.closest(".todo");

    if (buttonEl.matches(".delete-btn")) {
      this.deleteTodo(todoEl);
    } else if (buttonEl.matches(".edit-btn")) {
      this.editTodo(todoEl);
    } else if (buttonEl.matches(".save-btn")) {
      todoEl.addEventListener("submit", this.saveTodo.bind(this));
    } else if (buttonEl.matches(".complete-btn")) {
      this.completeTodo(todoEl);
    }
  }

  completeTodo(todoEl: HTMLFormElement) {
    todoEl.classList.toggle("done");
  }
  saveTodo(e: SubmitEvent) {
    e.preventDefault();
    const target = e.currentTarget as HTMLFormElement;
    const inputEl = target.querySelector("input");
    inputEl.readOnly = true;
    target.classList.remove("edit");
  }
  editTodo(todoEl: HTMLFormElement) {
    todoEl.classList.add("edit");
    const inputEl = todoEl.querySelector("input");
    inputEl.readOnly = false;
    inputEl.focus();
  }
  deleteTodo(todoEl: HTMLFormElement) {
    todoEl.classList.add("delete");
    todoEl.addEventListener("transitionend", () => {
      todoEl.remove();
    });
  }
  onAddTodo(e: SubmitEvent) {
    e.preventDefault();
    const content = (e.target as FormElements).content.value;
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }
    this.createTodoBox(content);
    this.inputEl.value = "";
  }

  createTodoBox(content: string) {
    const fragment = new DocumentFragment();
    const wrapperEl = document.createElement("form");
    const inputEl = document.createElement("input");

    wrapperEl.classList.add("todo");
    inputEl.classList.add("todo-item");
    inputEl.value = content;
    inputEl.readOnly = true;

    wrapperEl.appendChild(inputEl);
    wrapperEl.appendChild(this.createBtnEl("complete", ["fas", "fa-check"]));
    wrapperEl.appendChild(this.createBtnEl("edit", ["fas", "fa-edit"]));
    wrapperEl.appendChild(this.createBtnEl("delete", ["fas", "fa-trash"]));
    wrapperEl.appendChild(this.createBtnEl("save", ["fas", "fa-save"]));
    fragment.appendChild(wrapperEl);
    this.todoListEl.appendChild(fragment);
  }

  createBtnEl(type: "delete" | "edit" | "save" | "complete", iClass: string[]) {
    const btnEl = document.createElement("button");
    const iEl = document.createElement("i");

    btnEl.classList.add(type + "-btn");
    btnEl.type = type !== "save" ? "button" : "submit";
    iEl.classList.add(...iClass);
    btnEl.appendChild(iEl);

    return btnEl;
  }
}

new TodoList();
