const express = require("express");
const {
  uploadQuestion,
  getQuestions,
} = require("../controllers/questionController");

const router = express.Router();

// Route to upload a question
router.post("/upload", uploadQuestion);

// Route to fetch questions (supports filtering by subject and marks)
router.get("/", getQuestions);

module.exports = router;
