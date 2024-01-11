let todoInput = document.querySelector('.todo-input');
let todoButton = document.querySelector('.todo-button');
let todoList = document.querySelector('.todo-list');
let filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

function addTodo(event) {
    event.preventDefault();
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    let newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    if (todoInput.value == '') {
        return undefined
    }
    saveLocalTodos(todoInput.value);
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    todoInput.value = '';   
    update(todoDiv);
    todoList.appendChild(todoDiv);
}
function update (todoDiv) {
    let completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    let trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
}
function deleteTodo(event) {
    let item = event.target;
    if (event.key == "Enter" || item) {
        if (item.classList.contains('trash-btn')) {
            let todo = item.parentElement;
            todo.classList.add('fall');
            removeLocalTodos(todo);    
            todo.addEventListener('transitionend', event => {
                todo.remove();
            });
        }
        if (item.classList.contains('complete-btn')) {
            let todo = item.parentElement;
            todo.classList.toggle('completed');
        }
    }  
}
function filterTodo(e) {
    let todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
        }
    });
}

function getLocalStorageItems() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

function setLocalStorageItems(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function saveLocalTodos (todo) {
    let todos = getLocalStorageItems();
    todos.push(todo);
    setLocalStorageItems(todos);
}
function removeLocalTodos(todo) {
    let todos = getLocalStorageItems();
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    setLocalStorageItems(todos);
}
function getTodos() {
    let todos = getLocalStorageItems();
    todos.forEach(function (todo) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      
      update(todoDiv);
      
      todoList.appendChild(todoDiv);
    });
}