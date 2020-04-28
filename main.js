const addForm = document.querySelector('.add');
const taskInput = document.querySelector('.taskinput');
const ul = document.querySelector('.todos');
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

  ul.innerHTML += html;
};


// clear todos btn function
const clearTodoBtn = () => {
  if (ul.children.length) {
    clear.style.display = 'block';
  } else {
    clear.style.display = 'none';
  }
}

// filter tasks function
const filterTasks = text => {
  Array.from(ul.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(text))
    .forEach(todo => todo.classList.add('filtered'));  
  Array.from(ul.children)
    .filter(todo => todo.textContent.toLowerCase().includes(text))
    .forEach(todo => todo.classList.remove('filtered'));  
}


// add task
addForm.addEventListener('submit', e => {
  const todo = taskInput.value.trim();
  
  if(todo.length) {
    generateTemplate(todo);
  }

  taskInput.value = '';

  clear.style.display = 'block';


  e.preventDefault();
});

// remove task
ul.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }

  // remove clear btn
  clearTodoBtn();

});

// clear tasks
clear.addEventListener('click', e => {
  // ul.innerHTML = '';
  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
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


