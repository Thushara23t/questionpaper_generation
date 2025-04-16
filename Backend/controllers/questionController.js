const Question = require("../models/Question");

// Upload a new question
const uploadQuestion = async (req, res) => {
  try {
    const { subject, module, marks, description } = req.body;

    if (!subject || !module || !marks || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = new Question({ subject, module, marks, description });
    await newQuestion.save();

    res.status(201).json({ message: "Question uploaded successfully", newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch uploaded questions with optional filtering
const getQuestions = async (req, res) => {
  try {
    const { subject, marks } = req.query;
    let filter = {};

    if (subject) filter.subject = subject;
    if (marks) filter.marks = marks;

    const questions = await Question.find(filter);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { uploadQuestion, getQuestions };
