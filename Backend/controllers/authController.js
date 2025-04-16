const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // 🔹 Ensure email, password, and role are provided
    if (!email || !password || !role) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // 🔹 Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // 🔹 Store password as plain text (as per your requirement)
    const user = await User.create({ email, password, role });

    res.status(201).json({ message: "User Registered Successfully!", user });

  } catch (error) {
    console.error("Registration Error:", error); // 🔹 Log actual error in console
    res.status(400).json({ error: "Registration Failed!", details: error.message });
  }
};


// 📌 POST /api/auth/login (Authenticate user)

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
console.log(user)
    if (!user) return res.status(400).json({ error: "User Not Found!" });

    // 🔹 Check if entered password matches stored plain-text password
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }

    // 🔹 Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, role: user.role });

  } catch (error) {
    res.status(500).json({ error: "Server Error!" });
  }
};
