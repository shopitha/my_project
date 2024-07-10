const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();

// Connect to the database
connectDB();

app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

