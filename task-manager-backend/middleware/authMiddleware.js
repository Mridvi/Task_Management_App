const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified; // Store user data in request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
}

module.exports = authenticateToken;
