import Storage from "./Storage";

interface FormElements extends HTMLFormElement {
  content: HTMLInputElement;
}
export type Filter = "ALL" | "TODO" | "DONE";
export type ToDo = {
  id: number;
  content: string;
  status: Filter;
};

export default class TodoList {
  wrapperEl: HTMLDivElement;
  inputFormEl: HTMLFormElement;
  inputEl: HTMLInputElement;
  addBtnEl: HTMLButtonElement;
  todoContainerEl: HTMLDivElement;
  todolistEl: HTMLDivElement;
  radioAreaEl: HTMLDivElement;
  filterRadioEls: NodeListOf<HTMLInputElement>;
  storage: Storage<ToDo[]>;

  constructor(storage: Storage<ToDo[]>) {
    this.setElements();
    this.setEvents();
    this.storage = storage;
    this.loadTodo();
  }

  loadTodo() {
    this.storage
      .getData()
      .reverse()
      .forEach((todo) => {
        this.createTodoBox(todo.id, todo.content, todo.status);
      });
  }

  addStorage(todo: ToDo) {
    this.storage.setData([todo, ...(this.storage.getData() || [])]);
  }

  editStorage(
    id: number,
    { content, status }: { content?: string; status?: Filter },
  ) {
    const todos = this.storage.getData();
    const todoIdx = this.storage.getData().findIndex((data) => data.id === id);
    const newTodo =
      (content && { ...todos[todoIdx], content }) ||
      (status && { ...todos[todoIdx], status });
    todos.splice(todoIdx, 1, newTodo);
    this.storage.setData(todos);
  }

  deleteStorage(id: number) {
    const todos = this.storage.getData();
    const todoIdx = this.storage.getData().findIndex((data) => data.id === id);
    todos.splice(todoIdx, 1);
    this.storage.setData(todos);
  }

  setElements() {
    this.wrapperEl = document.querySelector("#input-container");
    this.inputFormEl = this.wrapperEl.querySelector("#input-area");
    this.inputEl = this.inputFormEl.querySelector("#todo-input");
    this.addBtnEl = this.inputFormEl.querySelector("#add-btn");
    this.todoContainerEl = document.querySelector("#todo-container");
    this.todolistEl = this.todoContainerEl.querySelector("#todo-list");
    this.radioAreaEl = document.querySelector("#radio-area");
    this.filterRadioEls = this.radioAreaEl.querySelectorAll("input");
  }

  setEvents() {
    this.inputFormEl.addEventListener("submit", this.onAddTodo.bind(this));
    this.todolistEl.addEventListener("click", this.onClickTodoList.bind(this));
    this.eventFilterTodo();
  }

  eventFilterTodo() {
    for (let idx = 0; idx < this.filterRadioEls.length; idx++) {
      this.filterRadioEls[idx].addEventListener("click", (e) => {
        const { value } = e.target as HTMLInputElement;
        this.filterTodo(value as Filter);
        window.location.hash = `#${value.toLowerCase()}`;
      });
    }
  }

  filterTodo(status: Filter) {
    switch (status) {
      case "TODO":
        this.todolistEl.classList.add("todo");
        this.todolistEl.classList.remove("done");
        break;
      case "DONE":
        this.todolistEl.classList.remove("todo");
        this.todolistEl.classList.add("done");
        break;
      default:
        this.todolistEl.classList.remove("todo");
        this.todolistEl.classList.remove("done");
        break;
    }
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
    this.editStorage(+todoEl.dataset.id, {
      status: todoEl.classList.contains("done") ? "DONE" : "TODO",
    });
  }
  saveTodo(e: SubmitEvent) {
    e.preventDefault();
    const target = e.currentTarget as HTMLFormElement;
    const inputEl = target.querySelector("input");
    inputEl.readOnly = true;
    target.classList.remove("edit");
    this.editStorage(+target.dataset.id, { content: inputEl.value });
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
    this.deleteStorage(+todoEl.dataset.id);
  }
  onAddTodo(e: SubmitEvent) {
    e.preventDefault();
    const content = (e.target as FormElements).content.value;
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }
    const id = Date.now();
    this.createTodoBox(id, content);
    this.addStorage({ id, content, status: "TODO" });
    this.inputEl.value = "";
  }

  createTodoBox(id: number, content: string, status?: Filter) {
    const fragment = new DocumentFragment();
    const wrapperEl = document.createElement("form");
    const inputEl = document.createElement("input");

    wrapperEl.classList.add("todo");
    status === "DONE" && wrapperEl.classList.add("done");
    wrapperEl.dataset.id = id.toString();
    inputEl.classList.add("todo-item");
    inputEl.value = content;
    inputEl.readOnly = true;

    wrapperEl.appendChild(inputEl);
    wrapperEl.appendChild(this.createBtnEl("complete", ["fas", "fa-check"]));
    wrapperEl.appendChild(this.createBtnEl("edit", ["fas", "fa-edit"]));
    wrapperEl.appendChild(this.createBtnEl("delete", ["fas", "fa-trash"]));
    wrapperEl.appendChild(this.createBtnEl("save", ["fas", "fa-save"]));
    fragment.appendChild(wrapperEl);
    this.todolistEl.insertAdjacentElement(
      "afterbegin",
      fragment.firstElementChild,
    );
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
