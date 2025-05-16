let todos = [];

// focus on input field when loaded
window.addEventListener('load', function() {
    document.getElementById('todoInput').focus();
});

// listen to the keyboard
document.getElementById('todoInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
    if (e.key === 'Escape') {
        if (todos.length > 0) {
            if (e.shiftKey) {
                deleteTodo(todos[todos.length - 1].id);
            } else {
                deleteTodo(todos[0].id);
            }
        }
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
        li.innerHTML = `
        <span>${todo.text}</span>
        <button onclick="deleteTodo(${todo.id})" class="delete-btn">delete</button>
        `;
        todoList.appendChild(li);
    });
}

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

// delete task
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}