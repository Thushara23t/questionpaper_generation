import React from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import UploadQuestions from "../components/UploadQuestions";
import DefinePatterns from "../components/DefinePattern";
import GeneratePaper from "../components/GeneratePaper";
import UploadedQuestions from "../components/UploadedQuestions";

const TeacherModule = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("teacherToken"); // Clear authentication token (if stored)
    navigate("/"); // Redirect to Login Page
  };

  const styles = {
    container: { display: "flex", height: "100vh" },
    sidebar: {
      width: "250px",
      background: "#343a40",
      color: "white",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    menuItem: {
      color: "white",
      textDecoration: "none",
      padding: "12px 15px",
      borderRadius: "6px",
      transition: "background 0.3s ease",
      fontSize: "16px",
    },
    activeMenuItem: {
      background: "#17a2b8",
      fontWeight: "bold",
    },
    logoutButton: {
      background: "#E74C3C",
      color: "white",
      border: "none",
      padding: "12px 15px",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      textAlign: "center",
      marginTop: "auto",
    },
    mainContent: { flex: 1, padding: "30px", backgroundColor: "#f8f9fa" },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <nav style={styles.sidebar}>
        <h2>📚 Teacher Module</h2>

        <Link
          to="/teacher-module/upload-questions"
          style={{
            ...styles.menuItem,
            ...(location.pathname.includes("upload-questions") ? styles.activeMenuItem : {}),
          }}
        >
          📥 Upload Questions
        </Link>

        <Link
          to="/teacher-module/generate-paper"
          style={{
            ...styles.menuItem,
            ...(location.pathname.includes("generate-paper") ? styles.activeMenuItem : {}),
          }}
        >
          📄 Generate Question Paper
        </Link>

        <Link
          to="/teacher-module/uploaded-questions"
          style={{
            ...styles.menuItem,
            ...(location.pathname.includes("uploaded-questions") ? styles.activeMenuItem : {}),
          }}
        >
          📋 Uploaded Questions
        </Link>

        {/* Logout Button */}
        <button style={styles.logoutButton} onClick={handleLogout}>🔓 Logout</button>
      </nav>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <Routes>
          <Route path="upload-questions" element={<UploadQuestions />} />
          <Route path="define-patterns" element={<DefinePatterns />} />
          <Route path="generate-paper" element={<GeneratePaper />} />
          <Route path="uploaded-questions" element={<UploadedQuestions />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherModule;
