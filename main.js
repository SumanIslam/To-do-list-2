const addForm = document.querySelector('.add');
const taskInput = document.querySelector('.taskinput');
const ul = document.querySelector('.todos');
const clear = document.querySelector('.clear');


// generate a html template

const generateTemplate = todo => {
  let html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="fas fa-trash-alt delete"></i>
    </li>
  `;

  ul.innerHTML += html;
};

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
  if(ul.children.length) {
    clear.style.display = 'block';
  } else {
    clear.style.display = 'none';
  }

});

// clear tasks
clear.addEventListener('click', e => {
  // ul.innerHTML = '';
  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
})

// search task

