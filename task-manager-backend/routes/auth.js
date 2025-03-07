const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();


const router = express.Router();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET; 


// Register User
router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
        [name, email, hashedPassword]
      );
  
      res.json({ message: "Registration successful!", user: newUser.rows[0] });
    } catch (error) {
      console.error("Error registering user:", error.message);
      res.status(500).json({ message: "Registration failed" });
    }
  });
  
  // Login User
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (user.rows.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ id: user.rows[0].id, name: user.rows[0].name }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ message: "Login successful!", token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email } });
    } catch (error) {
      console.error("Error logging in:", error.message);
      res.status(500).json({ message: "Login failed" });
    }
  });
  





module.exports = router;
