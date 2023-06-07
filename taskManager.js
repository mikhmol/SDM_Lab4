const fs = require('fs');

const TASKS_FILE = 'tasks.json'; // File where tasks are stored

function loadTasks() {
  try {
    const tasksData = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(tasksData);
  } catch (error) {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

function getIncompleteTasks() {
  const tasks = loadTasks();
  return tasks.filter((task) => !task.completed);
}

function getAllTasks() {
  return loadTasks();
}

function markTaskAsCompleted(taskTitle) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.title === taskTitle);
  if (task) {
    task.completed = true;
    task.completedDate = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task "${taskTitle}" marked as completed.`);
  } else {
    console.log(`Task "${taskTitle}" not found.`);
  }
}

function addTask(title, description, deadline) {
  const tasks = loadTasks();
  const task = {
    title,
    description,
    deadline,
    completed: false,
  };
  tasks.push(task);
  saveTasks(tasks);
  console.log(`Task "${title}" added.`);
}

function editTask(taskTitle, newTitle, newDescription, newDeadline) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.title === taskTitle);
  if (task) {
    task.title = newTitle || task.title;
    task.description = newDescription || task.description;
    task.deadline = newDeadline || task.deadline;
    saveTasks(tasks);
    console.log(`Task "${taskTitle}" edited.`);
  } else {
    console.log(`Task "${taskTitle}" not found.`);
  }
}

function getOverdueTasks() {
  const tasks = loadTasks();
  const today = new Date();
  return tasks.filter((task) => !task.completed && new Date(task.deadline) < today);
}

function deleteTask(taskTitle) {
  const tasks = loadTasks();
  const index = tasks.findIndex((task) => task.title === taskTitle);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    console.log(`Task "${taskTitle}" deleted.`);
  } else {
    console.log(`Task "${taskTitle}" not found.`);
  }
}

module.exports = {
  getIncompleteTasks,
  getAllTasks,
  markTaskAsCompleted,
  addTask,
  editTask,
  getOverdueTasks,
  deleteTask,
};
