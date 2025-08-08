// JavaScript code for To-Do List application

// Select DOM elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const taskList = document.getElementById('taskList');
const filterInput = document.getElementById('filterInput');
const filterDateInput = document.getElementById('filterDateInput');

// Initialize tasks array
let tasks = [];

// Set min date pada input date (add dan filter)
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);
filterDateInput.setAttribute('min', today);

// Function to render tasks (dengan filter tanggal jika ada)
function renderTasks() {
    taskList.innerHTML = '';
    let filtered = tasks;
    const filterDate = filterDateInput.value;
    if (filterDate) {
        filtered = tasks.filter(task => task.date === filterDate);
    }
    filtered.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${task.text} - ${task.date}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Function to add a task
function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskText && taskDate) {
        tasks.push({ text: taskText, date: taskDate });
        taskInput.value = '';
        dateInput.value = '';
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Event listeners
taskForm.addEventListener('submit', addTask);
filterDateInput.addEventListener('input', renderTasks);

// Initial render
renderTasks();