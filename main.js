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

  function showOverdueTasks() {
    const tasks = loadTasks();
    const today = new Date();
    const overdueTasks = tasks.filter((task) => !task.completed && new Date(task.deadline) < today);
    console.log('Overdue Tasks:');
    overdueTasks.forEach((task) => {
      console.log(`- ${task.title} (Deadline: ${task.deadline})`);
    });
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

  if (process.argv.length < 3) {
    console.log('Usage: node app.js <command> [arguments]');
    process.exit(1);
  }

  const command = process.argv[2];

  if (command === 'show-incomplete') {
    showIncompleteTasks();
  } else if (command === 'show-all') {
    showAllTasks();
  } else if (command === 'mark-completed') {
    const taskTitle = process.argv[3];
    markTaskAsCompleted(taskTitle);
  } else if (command === 'add') {
    const title = process.argv[3];
    const description = process.argv[4];
    const deadline = process.argv[5];
    addTask(title, description, deadline);
  } else if (command === 'edit') {
    const taskTitle = process.argv[3];
    const newTitle = process.argv[4];
    const newDescription = process.argv[5];
    const newDeadline = process.argv[6];
    editTask(taskTitle, newTitle, newDescription, newDeadline);
  } else if (command === 'show-overdue') {
    showOverdueTasks();
  } else if (command === 'delete') {
    const taskTitle = process.argv[3];
    deleteTask(taskTitle);
  } else {
    console.log('Invalid command.');
    process.exit(1);
  }
  