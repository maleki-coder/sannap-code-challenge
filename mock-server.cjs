// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.post('/DEY/agent/verification/signup/create_otp', (req, res) => {
  setTimeout(() => {
    res.json({
      message: 'This is a delayed mock response',
      success: true
    });
  }, 2000)
});

app.post(`/DEY/agent/verification/signup/validate_otp`, (req, res) => {
 setTimeout(() => {
    res.json({
      message: 'This is a delayed mock response',
      success: true
    });
  }, 1000)
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
