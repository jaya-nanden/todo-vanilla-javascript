// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const deleteButton = document.querySelector('.delete-all');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);
deleteButton.addEventListener('click', deleteAllTodo);


// Functions
function addTodo(event) {

    // Prevent from form submitting
    event.preventDefault();

    if(todoInput.value != '') {
      // todo DIV
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');

      // todo item LI
      const newTodo = document.createElement('li');
      newTodo.innerHTML = todoInput.value;
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo);

      // Add todo to local storage
      saveLocalTodos(todoInput.value);

      // Check Mark Button
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('complete-btn');
      todoDiv.appendChild(completedButton);

      // Check Trash Button
      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);

      // Append DIV to Full List
      todoList.appendChild(todoDiv);

      // Clear Input Value
      todoInput.value = '';
    }

    
}


function deleteCheck(event) {
    const item = event.target;

    // Delete todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // Animation 
        todo.classList.add('fall');
        removeLocalTodo(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    // Check todo
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }


}


function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
              todo.style.display = 'flex';
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


function saveLocalTodos(todo) {
  // Check already exists
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // Set data to Local Storage
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
  // Check already exists
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(value) {
    // todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // todo item LI
    const newTodo = document.createElement('li');
    newTodo.innerHTML = value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append DIV to Full List
    todoList.appendChild(todoDiv);
  });

}


function removeLocalTodo(todo) {
  // Check already exists
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoValue = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoValue), 1);
  
  // Set data to local storage
  localStorage.setItem('todos', JSON.stringify(todos));
}


function deleteAllTodo() {
  localStorage.clear();
  window.location.reload();
}