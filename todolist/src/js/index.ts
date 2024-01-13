import "@fortawesome/fontawesome-free/js/all.min.js";
import "../scss/style.scss";
import TodoList, { Filter } from "./TodoList";
import Router from "./Router";

window.addEventListener("DOMContentLoaded", () => {
  const todolist = new TodoList();
  const route = new Router();

  const setFilterPage = (status: Filter) => () => {
    (
      todolist.radioAreaEl.querySelector(
        `input[value=${status}]`,
      ) as HTMLInputElement
    ).click();
  };

  route
    .addRoute("#all", setFilterPage("ALL"))
    .addRoute("#todo", setFilterPage("TODO"))
    .addRoute("#done", setFilterPage("DONE"))
    .setNotFound(() => {
      window.location.hash = "#all";
    });
});
