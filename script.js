let todos = [];

// listen to the keyboard
document.getElementById('todoInput').addEventListener('keyup', function(e) {
    // Enter: add item
    if (e.key === 'Enter') {
        if (e.shiftKey) {
            // Shift + Enter: add item to the top;
            let front = true;
            addTodo(front);
        } else {
            // Enter: add item to the bottom;
            addTodo();
        }
    }
    // Esc: delete item
    if (e.key === 'Escape') {
        if (todos.length > 0) {
            if (e.shiftKey) {
                // Shift + ESC: delete first item
                deleteTodo(todos[0].id);
            } else if (e.ctrlKey) {
                // Control + ESC: Delete all items
                deleteAllTodo();
            } else {
                // ESC: delete last item
                deleteTodo(todos[todos.length - 1].id);
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
function addTodo(front = null) {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        if (front) {
            todos.unshift(todo);
        } else {
            todos.push(todo);
        }
        renderTodos();
        input.value = '';
    }
}

// delete task
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// delete all tasks
function deleteAllTodo() {
    const message = `Delete ${todos.length} item(s)?`
    if (todos.length && confirm(message)) {
        todos.length = 0;
        renderTodos();
    }
}