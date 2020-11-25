const addForm = document.querySelector('.add');
const taskInput = document.querySelector('.taskinput');
const list = document.querySelector('.todos');
const clear = document.querySelector('.clear');
const search = document.querySelector('.search input');


// generate a html template function

const generateTemplate = todo => {
  let html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="fas fa-trash-alt delete"></i>
    </li>
  `;

  list.innerHTML += html;
};


// clear todo btn function
const clearTodoBtn = () => {
  if (list.children.length) {
    clear.style.display = 'block';
  } else {
    clear.style.display = 'none';
  }
}

// filter tasks function
const filterTasks = text => {
  Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(text))
    .forEach(todo => todo.classList.add('filtered'));  
  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(text))
    .forEach(todo => todo.classList.remove('filtered'));  
}


// add task
addForm.addEventListener('submit', e => {
  // todo from user
  const todo = taskInput.value.trim();
  
  //if todo have length then it will generate a list
  if(todo.length) {
    generateTemplate(todo);
  }

  //clearing input field after adding todo
  taskInput.value = '';

  //display the clear button
  clear.style.display = 'block';

  e.preventDefault();
});

// remove task
list.addEventListener('click', e => {
  // deleting list element
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }

  // remove clear btn
  clearTodoBtn();

  e.preventDefault();

});

// clear tasks
clear.addEventListener('click', e => {
  // list.innerHTML = '';
  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
  // remove clear btn
  clearTodoBtn();
  
})

// search task
search.addEventListener('keyup', e => {
  const text = search.value.trim().toLowerCase();
  
  filterTasks(text);

  e.preventDefault();
})


