 // server.js or app.js

const express = require('express');
const mongoose = require('mongoose');
const taskRouter = require('./routes/tasks'); // Require tasks router

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('Connection error:', err.message);
});

// Middleware
app.use(express.json()); // Body parser middleware

// Routes
app.use('/api/tasks', taskRouter); // Mount tasks router under /api/tasks

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
