require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const tasksRoutes = require("./routes/tasks"); 
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
