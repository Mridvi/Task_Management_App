require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const authenticateToken = require("../middleware/authMiddleware"); // Middleware for authentication

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Get all tasks for logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user_id = req.user.id; // Get user ID from token

    const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [user_id]);

    res.json(tasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a specific task by ID (Only if user owns it)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const task = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [id, user_id]);

    if (task.rows.length === 0) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json(task.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new task for logged-in user
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, description, isHighPriority } = req.body;
    const user_id = req.user.id;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    const newTask = await pool.query(
      "INSERT INTO tasks (title, description, user_id, is_high_priority) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, user_id, isHighPriority]
    );

    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update a task (Only if user owns it)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isHighPriority } = req.body;
    const user_id = req.user.id;

    const task = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );

    if (task.rows.length === 0) {
      return res.status(403).json({ message: "You are not authorized to update this task" });
    }

    const updatedTask = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, is_high_priority = $3 WHERE id = $4 RETURNING *",
      [title, description, isHighPriority, id]
    );

    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a task (Only if user owns it)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id; // Get user ID from token

    // Check if the task belongs to the logged-in user
    const task = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [id, user_id]);

    if (task.rows.length === 0) {
      return res.status(403).json({ message: "You are not authorized to delete this task" });
    }

    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

    res.json({ message: "Task Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
