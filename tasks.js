const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Tasks endpoint');
});

module.exports = router;
