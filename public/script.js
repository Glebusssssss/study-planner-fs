const taskList = document.getElementById('taskList');

// Fetch tasks from the backend
async function fetchTasks() {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    renderTasks(tasks);
}

// Render the HTML for the tasks
function renderTasks(tasks) {
    taskList.innerHTML = tasks.map(task => `
        <li>
            <div>
                <strong>${task.title}</strong> <br>
                <small>${task.subject}</small>
            </div>
            <button onclick="deleteTask(${task.id})">Done</button>
        </li>
    `).join('');
}

// Add a task to the database
async function addTask() {
    const title = document.getElementById('taskInput').value;
    const subject = document.getElementById('subjectInput').value;

    if (!title) return alert("Please enter a task title!");

    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subject })
    });

    // Clear inputs and reload list
    document.getElementById('taskInput').value = '';
    document.getElementById('subjectInput').value = '';
    fetchTasks();
}

// Delete a task from the database
async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });
    fetchTasks(); // Refresh list
}

// Initial Load
fetchTasks();