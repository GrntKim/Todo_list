let todos = [];
let isFocused = true;
let nextId = 0;
// whether input field is focused or blurred
const input = document.getElementById('todoInput');

input.addEventListener('focus', function() {
    isFocused = true;
});

input.addEventListener('blur', function() {
    isFocused = false;
});

// listen to the keyboard - input label
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
});

// listen to the keyboard - document level (works even if input label is out of focus)
document.addEventListener('keydown', function(e) {
    // If unfocused, Enter to re-focus on input field
    if (!isFocused && e.key === 'Enter') {
        document.getElementById('todoInput').focus();
    }
    // Esc: delete item
    if (e.key === 'Escape') {
        if (todos.length > 0) {
            if (e.shiftKey) {
                // Shift + ESC: delete first item
                deleteTodo(todos[0].id);
            } else if (e.ctrlKey || e.metaKey) {
                // Control(or Command - Mac) + ESC: Delete all items
                deleteAllTodo();
            } else {
                // ESC: delete last item
                deleteTodo(todos[todos.length - 1].id);
            }
        }
    }
    // Control(or Command - Mac) + H: toggle instructions
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyH') {
        toggleInstructions(document.getElementById('helpButton'));
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
        <span>${todo.content}</span>
        <button onclick="deleteTodo(${todo.id})" class="delete-btn">delete</button>
        <button onclick="updateTodo(${todo.id})" class="update-btn">update</button>
        `;
        todoList.appendChild(li);
    });
}

// create task
function createTodo(content) {
    return {
        id: nextId++,
        content: content,
        completed: false
    };
}

// add task
function addTodo(front = null) {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text) {
        const todo = createTodo(text);

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
    const message = `Delete ${todos.length} item(s)?`;
    if (todos.length && confirm(message)) {
        todos.length = 0;
        renderTodos();
    }
}

// toggle instructions section - triggered by clicking or keyboard shortcut
function toggleInstructions(button) {
    const instructions = document.getElementById('instructions');

    if (instructions.style.display === 'none') {
        instructions.style.display = 'block';
        button.textContent = 'Hide';
    } else {
        instructions.style.display = 'none';
        button.textContent = 'Help';
    }
}

function updateTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return;

    const newContent = prompt('Update...', todo.content);

    if (newContent === null) return;

    if (newContent.trim()) {
        todo.content = newContent.trim();
        renderTodos();
        document.getElementById('todoInput').focus();
    }
}