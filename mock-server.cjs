// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.post("/DEY/agent/verification/signup/create_otp", (req, res) => {
  setTimeout(() => {
    res.json({
      message: "This is a delayed mock response",
      success: true,
    });
  }, 2000);
});

app.post(`/DEY/agent/verification/signup/validate_otp`, (req, res) => {
  setTimeout(() => {
    res.json({
      message: "This is a delayed mock response",
      success: true,
    });
  }, 1000);
});
app.post(`/DEY/agent/verification/signup/check_agency_code`, (req, res) => {
  const { agent_code } = req.body;

  // Check if agentCode is "1111" return error
  if (agent_code === "1111") {
    return res.status(400).json({
      message: "کد نمایندگی ۱۱۱۱ قبلا ثبت شده است",
      success: false,
    });
  }
  setTimeout(() => {
    res.status(200).json({
      message: "This is a delayed mock response",
      success: true,
    });
  }, 1000);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
