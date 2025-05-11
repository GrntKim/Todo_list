let todos = [];

// add task
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        todos.push(todo);
        renderTodos();
        input.value = '';
    }
}

// fofus on input field when loaded
window.addEventListener('load', function() {
    document.getElementById('todoInput').focus();
});

// listen to the keyboard
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// show task(s)
function renderTodos() {
    const todoList = document.getElementById('todoList');
    if (!todoList) return;
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `<span>${todo.text}</span>`;
        todoList.appendChild(li);
    });
}