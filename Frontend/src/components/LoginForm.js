import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService.js"; 
import { Link } from "react-router-dom"; 
import "../styles/Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher"); // Default role: teacher
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await loginUser(email, password, role); // ✅ Send role along with login
      console.log("Login Response:", response);

      if (response.token) {
        alert(`Login successful as ${response.role}`);
        
        // ✅ Redirect based on role (ensure correct case)
        if (response.role.toLowerCase() === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/teacher-module");
        }
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (err) {
      setError("Error logging in, please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email:</label>
            <input 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn">Login</button>
          <p>
            Don't have an account? <Link to="/register" className="register-link">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
