const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const protect = async (req, res, next) => {
  let token;
  console.log('Auth middleware called for:', req.method, req.path);
  console.log('Authorization header:', req.headers.authorization ? 'Present' : 'Missing');

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log('Token extracted:', token ? 'Yes' : 'No');

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded, user ID:', decoded.id);

      req.user = await User.findById(decoded.id).select("-password");
      console.log('User found:', req.user ? req.user.name : 'Not found');

      if (!req.user) {
        console.log('User not found in database');
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log('No valid authorization header');
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
