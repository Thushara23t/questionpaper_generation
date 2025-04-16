import React, { useState } from "react";

const UploadSyllabus = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green"); // Success by default

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file before uploading.");
      setMessageColor("red");
      return;
    }

    const formData = new FormData();
    formData.append("syllabus", file);

    try {
      const response = await fetch("http://localhost:5000/api/syllabus/upload-syllabus", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Upload Successful!");
        setMessageColor("green");
      } else {
        setMessage(data.message || "Upload failed.");
        setMessageColor("red");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage(" uploaded syllabus.");
      setMessageColor("blue");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Upload Syllabus</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required style={{ display: "block", marginBottom: "10px" }} />
        <button type="submit" style={{ padding: "10px", background: "#34495E", color: "white", border: "none" }}>
          Upload Syllabus
        </button>
      </form>
      {message && <p style={{ marginTop: "10px", color: messageColor }}>{message}</p>}
    </div>
  );
};

export default UploadSyllabus;
