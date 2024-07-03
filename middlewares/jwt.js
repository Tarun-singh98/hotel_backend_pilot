const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // first check request headers has authorisation or not

  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  // Extract the jwt token from the request header
  const token = authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorised" });

  try {
    // Verify jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid Token" });
  }
};



// Function to generate JWT token
const generateToken = (userData) => {
  // Generate a new JWT Token using user data
  return jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: 3000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
