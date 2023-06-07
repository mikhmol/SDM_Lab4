const {
    getIncompleteTasks,
    getAllTasks,
    markTaskAsCompleted,
    addTask,
    editTask,
    getOverdueTasks,
    deleteTask
  } = require('./taskManager');
  
  if (process.argv.length < 3) {
    console.log('Usage: node app.js <command> [arguments]');
    process.exit(1);
  }
  
  const command = process.argv[2];
  
  if (command === 'get-incomplete') {
    getIncompleteTasks();
  } else if (command === 'get-all') {
    getAllTasks();
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
  } else if (command === 'get-overdue') {
    getOverdueTasks();
  } else if (command === 'delete') {
    const taskTitle = process.argv[3];
    deleteTask(taskTitle);
  } else {
    console.log('Invalid command.');
    process.exit(1);
  }
  