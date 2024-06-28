// app.js
const express = require('express');
const authenticateToken = require('./middleware/auth');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Example protected route
app.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted' });
});

// Example login route to generate a token
app.post('/login', (req, res) => {
  // Example: Replace with your authentication logic
  const username = req.body.username; // Assuming username/password check
  const password = req.body.password;

  // Example: Dummy user authentication (replace with your logic)
  if (username === 'user' && password === 'password') {
    const user = { username: username };
    const token = jwt.sign(user, 'secretKey');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
