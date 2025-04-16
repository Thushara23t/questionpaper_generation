import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [teacherCount, setTeacherCount] = useState(0);
  const [subjectCount, setSubjectCount] = useState(0);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/teachers/count")
      .then((res) => res.json())
      .then((data) => setTeacherCount(data.count))
      .catch((err) => console.error("Error fetching teacher count:", err));

    fetch("http://localhost:5000/api/subjects/count")
      .then((res) => res.json())
      .then((data) => setSubjectCount(data.count))
      .catch((err) => console.error("Error fetching subject count:", err));
  }, []);

  const handleUploadClick = () => {
    setShowUploadForm(true);
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

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
      setMessage("Upload failed.");
      setMessageColor("red");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Sidebar */}
      <div style={{ width: "280px", background: "#2C3E50", padding: "20px", color: "white", display: "flex", flexDirection: "column", gap: "20px" }}>
        <h2 style={{ display: "flex", alignItems: "center", fontSize: "22px", fontWeight: "bold" }}>
          📁 Menu
        </h2>
        <button
          onClick={handleUploadClick}
          style={{ textDecoration: "none", color: "white", fontSize: "18px", padding: "10px", borderRadius: "5px", background: "#34495E", textAlign: "center", border: "none", cursor: "pointer" }}
        >
          📥 Upload Syllabus
        </button>
        <button
          onClick={handleLogout}
          style={{ textDecoration: "none", color: "white", fontSize: "18px", padding: "10px", borderRadius: "5px", background: "#E74C3C", textAlign: "center", border: "none", cursor: "pointer" }}
        >
          🔓 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#2C3E50", marginBottom: "40px" }}>
          📘 Question Paper System
        </h1>

        {/* Show Upload Form when clicked */}
        {showUploadForm ? (
          <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", background: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h2>Upload Syllabus</h2>
            <form onSubmit={handleUpload}>
              <input type="file" onChange={handleFileChange} required style={{ display: "block", marginBottom: "10px" }} />
              <button type="submit" style={{ padding: "10px", background: "#34495E", color: "white", border: "none" }}>
                Upload Syllabus
              </button>
            </form>
            {message && <p style={{ marginTop: "10px", color: messageColor }}>{message}</p>}
          </div>
        ) : (
          // Stats Section
          <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
            <div style={{
              background: "white",
              padding: "40px",
              borderRadius: "16px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "300px",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <h2 style={{ fontSize: "50px", marginBottom: "10px" }}>👨‍🏫 {teacherCount}</h2>
              <p style={{ fontSize: "18px", color: "#555" }}>Teachers Logged In</p>
            </div>

            <div style={{
              background: "white",
              padding: "40px",
              borderRadius: "16px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "300px",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <h2 style={{ fontSize: "50px", marginBottom: "10px" }}>📚 {subjectCount}</h2>
              <p style={{ fontSize: "18px", color: "#555" }}>Subjects Available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
