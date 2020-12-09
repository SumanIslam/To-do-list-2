// variables
const addForm = document.querySelector('.add');
const taskInput = document.querySelector('.task-input');
const list = document.querySelector('.todos');
const clear = document.querySelector('.clear');
const search = document.querySelector('.search input');

// all event listeners...
// Dom Load event
document.addEventListener('DomContentLoaded', getTodosFromLocalStorage());

// add todo event
addForm.addEventListener('submit', addToDo);

// delete todo event
list.addEventListener('click', deleteToDo);

// clear todo event
clear.addEventListener('click', clearToDo);

// search todo event
search.addEventListener('keyup', searchToDo);

// all functions...
// generate list template function
function generateTemplate(todo) {
  let html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="fas fa-trash-alt delete"></i>
    </li>
  `;

  list.innerHTML += html;
};

// clear todo btn function
function clearTodoBtn() {
  if (list.children.length) {
    clear.style.display = 'block';
  } else {
    clear.style.display = 'none';
  }
}

// filter tasks function
function filterTasks(text) {
  Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(text))
    .forEach(todo => todo.classList.add('filtered'));
  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(text))
    .forEach(todo => todo.classList.remove('filtered'));
}

// local storage template
function localStorageTemplate() {
  let todos;
   if (localStorage.getItem('todos') === null) {
    todos = [];
    return todos;
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    return todos;
  }
}
//set todos in local storage
function storeToDoInLocalStorage(todo) {
  // let todos;
  // generating local storage template
  let todos = localStorageTemplate();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// get todos from local storage
function getTodosFromLocalStorage() {
  
  // generating local storage template
  let todos = localStorageTemplate();
  todos.forEach(todo => {
    generateTemplate(todo);
  })
  // remove clear btn
    clearTodoBtn();
}

// remove todo from local storage
function removeToDoFromLocalStorage(todoInput) {
  // let todos;
  // generating local storage template
  let todos = localStorageTemplate();

  todos.forEach((todo, index) => {
    if(Array.from(todoInput.children)[0].textContent === todo) {
      console.log(todos.splice(index, 1));
    }
  })
  localStorage.setItem('todos', JSON.stringify(todos));
}

  // add todo
  function addToDo(e) {
    // todo from user
    const todo = taskInput.value.trim();

    //if todo have length then it will generate a list
    if (todo.length) {
      generateTemplate(todo);
    }

    //clearing input field after adding todo
    taskInput.value = '';

    //display the clear button
    clear.style.display = 'block';

    // store todo in local storage
    storeToDoInLocalStorage(todo);

    e.preventDefault();
  }

  // delete todo
  function deleteToDo(e) {
    // deleting list element
    if (e.target.classList.contains('delete')) {
      e.target.parentElement.remove();

      // remove todo from local storage
      removeToDoFromLocalStorage(e.target.parentElement);
    }

    // remove clear btn
    clearTodoBtn();

    e.preventDefault();

  }

  // clear todo
  function clearToDo() {
    // list.innerHTML = '';
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    // remove clear btn
    clearTodoBtn();

    //clear todos from local storage;
    localStorage.clear();
  }

  // search task
  function searchToDo(e) {
    const text = search.value.trim().toLowerCase();

    filterTasks(text);

    e.preventDefault();
  }