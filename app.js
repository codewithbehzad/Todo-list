// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");

// Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodos);

// Functions

// for add new todos
function addTodo(e) {
  e.preventDefault();
  // 1. create div
  // 2. create new todo
  // 3. add to DOM (append)
  // 4. reset our main input
  const newDiv = document.createElement("div");
  newDiv.classList.add("todo");
  const newTodo = `  <li>${todoInput.value}</li>
                  <span><i class="fas fa-trash"></i></span>
                <span><i class="fas fa-check-square"></i></span>  `;
  newDiv.innerHTML = newTodo;
  // append to DOM
  todoList.appendChild(newDiv);
  // add to local Storsge
  saveLocalTodos(todoInput.value);
  // reset input
  todoInput.value = "";
}

// for remove or checked todos
function checkRemove(e) {
  const classList = [...e.target.classList];
  const item = e.target;

  if (classList[1] === "fa-check-square") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
  } else if (classList[1] === "fa-trash") {
    const todo = item.parentElement.parentElement;
    // remove from Local Storage
    removeLocalTodos(todo);

    todo.remove();
  }
}

// filter todos for groups
function filterTodos(e) {
  console.log(todoList.childNodes);
  const todos = [...todoList.childNodes];
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// local:
function saveLocalTodos(todo) {
  // localStorage.getItem("todos")
  // localStorage.setItem("key", JSON.stringify(value));

  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.forEach((todo) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo");
    const newTodo = `  <li>${todo}</li>
                    <span><i class="fas fa-trash"></i></span>
                  <span><i class="fas fa-check-square"></i></span>  `;
    newDiv.innerHTML = newTodo;
    // append to DOM
    todoList.appendChild(newDiv);
  });
}

// to remove frome LocalStorage
function removeLocalTodos(todo) {
  console.log(todo.children[0].innerText);

  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteredTodos = savedTodos.filter(
    (t) => t !== todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}
