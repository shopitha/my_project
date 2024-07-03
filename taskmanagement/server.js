const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tasksRouter = require('./backend/routes/tasks');
const authenticateToken = require('./backend/middleware/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/taskmanagement', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());

app.use('/tasks', tasksRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
