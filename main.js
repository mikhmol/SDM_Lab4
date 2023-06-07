const fs = require('fs');

const TASKS_FILE = 'tasks.json'; // Файл, де зберігаються завдання

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

function showIncompleteTasks() {
  const tasks = loadTasks();
  const incompleteTasks = tasks.filter((task) => !task.completed);
  incompleteTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  console.log('Incomplete Tasks:');
  incompleteTasks.forEach((task) => {
    console.log(`- ${task.title} (Deadline: ${task.deadline})`);
  });
}

function showAllTasks() {
    const tasks = loadTasks();
    console.log('All Tasks:');
    tasks.forEach((task) => {
      const status = task.completed ? 'Completed' : 'Incomplete';
      console.log(`- ${task.title} (Deadline: ${task.deadline}, Status: ${status})`);
    });
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