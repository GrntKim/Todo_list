let todos = [];

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