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
  
  const commandActions = {
  'get-incomplete': getIncompleteTasks,
  'get-all': getAllTasks,
  'mark-completed': () => {
    const taskTitle = process.argv[3];
    markTaskAsCompleted(taskTitle);
  },
  'add': () => {
    const title = process.argv[3];
    const description = process.argv[4];
    const deadline = process.argv[5];
    addTask(title, description, deadline);
  },
  'edit': () => {
    const taskTitle = process.argv[3];
    const newTitle = process.argv[4];
    const newDescription = process.argv[5];
    const newDeadline = process.argv[6];
    editTask(taskTitle, newTitle, newDescription, newDeadline);
  },
  'get-overdue': getOverdueTasks,
  'delete': () => {
    const taskTitle = process.argv[3];
    deleteTask(taskTitle);
  }
};

if (command in commandActions) {
  commandActions[command]();
} else {
  console.log('Invalid command.');
  process.exit(1);
}
  