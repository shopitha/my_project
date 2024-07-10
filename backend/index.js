const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const authenticateToken = require('./middleware/auth');

mongoose.connect('mongodb://localhost:27017/task_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');

// Middleware to authenticate tokens for tasks
app.use('/tasks', authenticateToken, tasksRouter);

// Routes for users (assuming they are defined in usersRouter)
app.use('/users', usersRouter);

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
