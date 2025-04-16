const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Syllabus = require("../models/Syllabus");

const router = express.Router();

// Configure Multer to store files temporarily
const storage = multer.memoryStorage(); // Store in memory or use Multer GridFS for MongoDB
const upload = multer({ storage });

router.post("/upload-syllabus", upload.single("syllabus"), async (req, res) => {
  try {
    const { teacherId } = req.body;
    const file = req.file;

    if (!teacherId || !file) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Save file details in MongoDB Atlas
    const newSyllabus = new Syllabus({
      teacherId,
      filePath: file.originalname, // Store original file name
      fileName: file.originalname
    });

    await newSyllabus.save();

    res.json({ message: "Syllabus uploaded successfully!" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
