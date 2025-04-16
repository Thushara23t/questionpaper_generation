const mongoose = require("mongoose");

const syllabusSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  filePath: { type: String, required: true }, // Store file URL or path
  fileName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Syllabus", syllabusSchema);
