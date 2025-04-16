import React, { useState, useEffect } from "react";
import { UploadQuestion } from "../services/questionService";

const UploadedQuestions = () => {
  const [questions, setQuestions] = useState([]); // Store all questions
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Store filtered questions
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMarks, setSelectedMarks] = useState("");

  // ✅ Fetch questions from backend when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        console.log("Fetched Questions:", data); // Debugging log
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // ✅ Get unique subjects & marks dynamically from fetched questions
  const uniqueSubjects = [...new Set(questions.map((q) => q.subject))];
  const uniqueMarks = [...new Set(questions.map((q) => q.marks))];

  // ✅ Filter questions when subject or marks are selected
  useEffect(() => {
    if (selectedSubject && selectedMarks) {
      const filtered = questions.filter(
        (q) => q.subject === selectedSubject && q.marks === parseInt(selectedMarks)
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions([]);
    }
  }, [selectedSubject, selectedMarks, questions]);

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>📋 Uploaded Questions</h1>

      {/* ✅ Dropdown Filters */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
        >
          <option value="">Select Subject</option>
          {uniqueSubjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          value={selectedMarks}
          onChange={(e) => setSelectedMarks(e.target.value)}
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
        >
          <option value="">Select Marks</option>
          {uniqueMarks.map((marks, index) => (
            <option key={index} value={marks}>
              {marks} Marks
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Display Table Only if Filters are Selected */}
      {selectedSubject && selectedMarks && filteredQuestions.length > 0 ? (
        <table style={{ width: "80%", margin: "auto", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#333", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid white" }}>Subject</th>
              <th style={{ padding: "10px", border: "1px solid white" }}>Module</th>
              <th style={{ padding: "10px", border: "1px solid white" }}>Marks</th>
              <th style={{ padding: "10px", border: "1px solid white" }}>Question</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", textAlign: "center" }}>{q.subject}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{q.module}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{q.marks}</td>
                <td style={{ padding: "10px", textAlign: "left" }}>{q.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: "20px" }}>
          {selectedSubject && selectedMarks ? "No questions found for selected filters." : "Select a subject and marks to view questions."}
        </p>
      )}
    </div>
  );
};

export default UploadedQuestions;
