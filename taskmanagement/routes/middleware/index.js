const express = require('express');
const mongoose = require('mongoose');
const authenticateToken = require('./middleware/auth'); // Require the JWT middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

// Require routers
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');

// Protect routes with JWT middleware
app.use('/tasks', authenticateToken, tasksRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
