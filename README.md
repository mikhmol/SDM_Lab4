# SDM_Lab4
Software development methodology, lab 4

# Task tracking console application
The task tracking console application is designed to help users track and manage their tasks efficiently. It provides functionality to view, add, edit, mark tasks as completed, delete tasks, and identify overdue tasks. The application operates in a non-interactive mode, where the user initiates the application and receives immediate results without further input.

### To build and run, do the following:
1. Clone this repository:

```bash
git clone https://github.com/mikhmol/SDM_Lab4
```

2. Make sure you have Node.js installed on your computer. You can download it from the official website: https://nodejs.org.
3. Open a terminal and navigate to the folder with this program:

```bash
cd .\SDM_Lab4
```

4. Install the dependencies:

```bash
npm fs
```

5. Once the dependencies are installed, you can run the application using the following command:

```bash
node app.js <command> [arguments]
```
Replace <command> with one of the available commands:

- get-incomplete: Show the list of incomplete tasks.
- get-all: Show the list of all tasks.
- mark-completed <taskTitle>: Mark a task as completed. Replace <taskTitle> with the title of the task.
- add <title> <description> <deadline>: Add a new task. Replace <title>, <description>, and <deadline> with the task details.
- edit <taskTitle> [newTitle] [newDescription] [newDeadline]: Edit an existing task. Replace <taskTitle> with the title of the task. You can optionally provide the new title, description, and deadline.
- get-overdue: Show the list of overdue tasks.
- delete <taskTitle>: Delete a task. Replace <taskTitle> with the title of the task.
Note: The arguments in square brackets [arguments] are optional.
