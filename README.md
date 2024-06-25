### Project 3: Task Management Application
#### Day-by-Day Instructions

#### Day 1: Project Setup

*Objective*: Set up the project environment and initial repository.

*Tasks*:

1. *Install Node.js, Express.js, MongoDB, and Git*
   - *Node.js*:
     - Download and install the latest version of Node.js from the [official website](https://nodejs.org/).
     - Verify installation by running node -v and npm -v in the terminal.
   - *Express.js*:
     - Install Express globally:
       bash
       npm install -g express-generator
       
   - *MongoDB*:
     - Download and install MongoDB from the [official website](https://www.mongodb.com/try/download/community).
     - Start the MongoDB server by running mongod in the terminal.
   - *Git*:
     - Download and install Git from the [official website](https://git-scm.com/downloads).
     - Set up Git by configuring your username and email:
       bash
       git config --global user.name "Your Name"
       git config --global user.email "your.email@example.com"
       

2. *Initialize a new Git repository and create a basic folder structure*
   - Create a new project directory:
     bash
     mkdir task-management-app
     cd task-management-app
     
   - Initialize a Git repository:
     bash
     git init
     
   - Create a basic folder structure:
     bash
     mkdir backend frontend
     

3. *Set up a React.js project using create-react-app*
   - Navigate to the frontend directory:
     bash
     cd frontend
     
   - Initialize a new React project:
     bash
     npx create-react-app task-management-frontend
     
   - Navigate back to the root directory:
     bash
     cd ..
     

4. *Create the main backend folder and initialize it with Express.js*
   - Navigate to the backend directory:
     bash
     cd backend
     
   - Initialize a new Node.js project:
     bash
     npm init -y
     
   - Install Express.js and Mongoose:
     bash
     npm install express mongoose
     
   - Create an index.js file for the server:
     bash
     touch index.js
     
   - Add basic Express server setup in index.js:
     javascript
     const express = require('express');
     const mongoose = require('mongoose');
     const app = express();
     const PORT = process.env.PORT || 5000;

     mongoose.connect('mongodb://localhost:27017/task_management', {
       useNewUrlParser: true,
       useUnifiedTopology: true
     });

     app.get('/', (req, res) => {
       res.send('Hello World!');
     });

     app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
     });
     

5. *Commit and push the initial setup to GitHub*
   - Create a .gitignore file to exclude node_modules and other unnecessary files:
     bash
     touch .gitignore
     echo "node_modules/" >> .gitignore
     echo "frontend/node_modules/" >> .gitignore
     echo "frontend/build/" >> .gitignore
     
   - Stage and commit the changes:
     bash
     git add .
     git commit -m "Initial project setup"
     
   - Push to a new repository on GitHub:
     - Create a new repository on GitHub.
     - Link the local repository to GitHub and push the changes:
       bash
       git remote add origin https://github.com/yourusername/task-management-app.git
       git branch -M main
       git push -u origin main
       

*Outcome*: By the end of Day 1, the project environment will be set up, the initial repository will be created, and basic structures for both frontend and backend will be initialized and pushed to GitHub.
#### Day-by-Day Instructions

#### Day 2: Database Design and Basic API Setup

*Objective*: Design the database schema and set up basic API endpoints.

*Tasks*:

1. *Design Database Schema*
   - *Tasks Collection*:
     - Fields: title, description, status, priority, dueDate, createdAt, updatedAt
     - Example Document:
       json
       {
         "title": "Complete project documentation",
         "description": "Document all steps of the project setup and development.",
         "status": "pending",
         "priority": "high",
         "dueDate": "2024-06-30",
         "createdAt": "2024-06-22T10:00:00Z",
         "updatedAt": "2024-06-22T10:00:00Z"
       }
       
   - *Users Collection*:
     - Fields: username, email, password, createdAt, updatedAt
     - Example Document:
       json
       {
         "username": "shopitha",
         "email": "shopitha@example.com",
         "password": "hashedpassword",
         "createdAt": "2024-06-22T10:00:00Z",
         "updatedAt": "2024-06-22T10:00:00Z"
       }
       

2. *Set Up Mongoose Models*
   - Create models directory in backend folder.
   - Create Task.js and User.js files in models directory.
   - Define Mongoose schemas and models in respective files:
     javascript
     // models/Task.js
     const mongoose = require('mongoose');

     const taskSchema = new mongoose.Schema({
       title: { type: String, required: true },
       description: { type: String, required: true },
       status: { type: String, default: 'pending' },
       priority: { type: String, default: 'medium' },
       dueDate: { type: Date, required: true },
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now }
     });

     const Task = mongoose.model('Task', taskSchema);

     module.exports = Task;
     

     javascript
     // models/User.js
     const mongoose = require('mongoose');

     const userSchema = new mongoose.Schema({
       username: { type: String, required: true },
       email: { type: String, required: true },
       password: { type: String, required: true },
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now }
     });

     const User = mongoose.model('User', userSchema);

     module.exports = User;
     

3. *Set Up Basic API Endpoints*
   - **Create routes directory in backend folder.**
   - **Create tasks.js and users.js files in routes directory.**
   - **Define basic CRUD operations for tasks in tasks.js:**
     javascript
     // routes/tasks.js
     const express = require('express');
     const router = express.Router();
     const Task = require('../models/Task');

     // Get all tasks
     router.get('/', async (req, res) => {
       try {
         const tasks = await Task.find();
         res.json(tasks);
       } catch (err) {
         res.status(500).json({ message: err.message });
       }
     });

     // Create a new task
     router.post('/', async (req, res) => {
       const task = new Task({
         title: req.body.title,
         description: req.body.description,
         status: req.body.status,
         priority: req.body.priority,
         dueDate: req.body.dueDate
       });
       try {
         const newTask = await task.save();
         res.status(201).json(newTask);
       } catch (err) {
         res.status(400).json({ message: err.message });
       }
     });

     // Get a task by ID
     router.get('/:id', getTask, (req, res) => {
       res.json(res.task);
     });

     // Update a task
     router.patch('/:id', getTask, async (req, res) => {
       if (req.body.title != null) {
         res.task.title = req.body.title;
       }
       if (req.body.description != null) {
         res.task.description = req.body.description;
       }
       if (req.body.status != null) {
         res.task.status = req.body.status;
       }
       if (req.body.priority != null) {
         res.task.priority = req.body.priority;
       }
       if (req.body.dueDate != null) {
         res.task.dueDate = req.body.dueDate;
       }
       try {
         const updatedTask = await res.task.save();
         res.json(updatedTask);
       } catch (err) {
         res.status(400).json({ message: err.message });
       }
     });

     // Delete a task
     router.delete('/:id', getTask, async (req, res) => {
       try {
         await res.task.remove();
         res.json({ message: 'Deleted Task' });
       } catch (err) {
         res.status(500).json({ message: err.message });
       }
     });

     // Middleware to get task by ID
     async function getTask(req, res, next) {
       let task;
       try {
         task = await Task.findById(req.params.id);
         if (task == null) {
           return res.status(404).json({ message: 'Cannot find task' });
         }
       } catch (err) {
         return res.status(500).json({ message: err.message });
       }
       res.task = task;
       next();
     }

     module.exports = router;
     

   - **Create similar routes for users.js with basic CRUD operations for user management.**
   - **Integrate routes into the main server file (index.js):**
     javascript
     const express = require('express');
     const mongoose = require('mongoose');
     const app = express();
     const PORT = process.env.PORT || 5000;

     mongoose.connect('mongodb://localhost:27017/task_management', {
       useNewUrlParser: true,
       useUnifiedTopology: true
     });

     app.use(express.json());

     const tasksRouter = require('./routes/tasks');
     const usersRouter = require('./routes/users');

     app.use('/tasks', tasksRouter);
     app.use('/users', usersRouter);

     app.get('/', (req, res) => {
       res.send('Hello World!');
     });

     app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
     });
     

4. *Commit and push the changes to GitHub*
   - Stage and commit the changes:
     bash
     git add .
     git commit -m "Set up database schema and basic API endpoints"
     
   - Push to the GitHub repository:
     bash
     git push origin main
     

*Outcome*: By the end of Day 2, the database schema will be designed, Mongoose models will be created, basic CRUD API endpoints will be set up, and all changes will be committed and pushed to GitHub.
