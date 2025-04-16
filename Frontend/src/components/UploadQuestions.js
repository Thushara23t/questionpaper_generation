import React, { useState } from 'react';

const UploadQuestions = () => {
  const [subject, setSubject] = useState('');
  const [module, setModule] = useState('');
  const [marks, setMarks] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');

  const handleUpload = async () => {
    if (!subject || !module || !marks || !questionDescription) {
      alert("Please fill all fields before uploading.");
      return;
    }

    const questionData = {
      subject,
      module,
      marks,
      description: questionDescription, // Ensure this matches your backend model field name
    };

    try {
      const response = await fetch("http://localhost:5000/api/questions/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Question uploaded:", data);
      alert("Question uploaded successfully!");

      // Clear fields after upload
      setSubject('');
      setModule('');
      setMarks('');
      setQuestionDescription('');
    } catch (error) {
      console.error("❌ Error uploading question:", error);
      alert("Failed to upload question. Check console for details.");
    }
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h1>📥 Upload Questions</h1>
      <div style={{
        background: 'white', padding: '20px', borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '400px',
        margin: 'auto', display: 'flex', flexDirection: 'column', gap: '10px'
      }}>
        {/* Select Subject */}
        <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}>
          <option value="">Select Subject</option>
          <option value="Advanced Web">Advanced Web</option>
          <option value="Programming Using C#">Programming Using C#</option>
          <option value="Computer Network">Computer Network</option>
          <option value="NOSQL">NOSQL</option>
          <option value="IOT">IOT</option>
        </select>

        {/* Select Module */}
        <select value={module} onChange={(e) => setModule(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}>
          <option value="">Select Module</option>
          <option value="Module 1">Module 1</option>
          <option value="Module 2">Module 2</option>
          <option value="Module 3">Module 3</option>
          <option value="Module 4">Module 4</option>
          <option value="Module 5">Module 5</option>
        </select>

        {/* Select Marks */}
        <select value={marks} onChange={(e) => setMarks(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}>
          <option value="">Select Marks</option>
          <option value="2">2 Marks</option>
          <option value="10">10 Marks</option>
        </select>

        {/* Question Description */}
        <textarea
          placeholder="Enter question description..."
          value={questionDescription}
          onChange={(e) => setQuestionDescription(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', height: '80px', resize: 'none' }}
        />

        {/* Upload Button */}
        <button onClick={handleUpload} style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer' }}>Upload</button>
      </div>
    </div>
  );
};

export default UploadQuestions;
