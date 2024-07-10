<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authenticateToken = require('../middleware/auth');

// Create a new task
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = new Task({ title, description, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks
router.get('/', authenticateToken, async (req, res) => {
=======
// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Adjust the path as needed

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

// GET all tasks
router.get('/', async (req, res) => {
>>>>>>> da9c6abafdd7c885ea787a87ca6b712bc8380468
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
// Update a task
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title;
    task.description = description;
    task.status = status;

    await task.save();
    res.json(task);
=======
// GET a task by ID
router.get('/:id', getTask, (req, res) => {
  res.json(res.task);
});

// CREATE a new task
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
>>>>>>> da9c6abafdd7c885ea787a87ca6b712bc8380468
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

<<<<<<< HEAD
=======
// UPDATE a task
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

// DELETE a task
router.delete('/:id', getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Deleted Task' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

>>>>>>> da9c6abafdd7c885ea787a87ca6b712bc8380468
module.exports = router;
