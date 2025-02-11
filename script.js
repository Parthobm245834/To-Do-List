// Selectors
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach((task, index) => addTaskToDOM(task, index));
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [...taskList.children].map(task => task.querySelector("span").innerText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task to DOM
function addTaskToDOM(task, index) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task}</span>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
}

// Add task
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task === "") return alert("Task cannot be empty");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskToDOM(task, tasks.length - 1);
    taskInput.value = "";
});

// Edit task
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = prompt("Edit Task:", tasks[index]);
    if (newTask === null || newTask.trim() === "") return;
    tasks[index] = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Delete task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Initialize app
loadTasks();
