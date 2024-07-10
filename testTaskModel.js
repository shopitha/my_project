const mongoose = require('mongoose');
const Task = require('./backend/models/Task');

mongoose.connect('mongodb://localhost:27017/taskmanagement', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    
    const newTask = new Task({
      title: 'Sample Task',
      description: 'This is a sample task',
      status: 'pending'
    });

    newTask.save()
      .then(task => {
        console.log('Task saved:', task);
        mongoose.connection.close();
      })
      .catch(err => console.error('Error saving task:', err));
  })
  .catch(err => console.error('MongoDB connection error:', err));
