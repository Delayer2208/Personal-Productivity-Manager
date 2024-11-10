const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model for fetching user data

// Middleware function to authenticate requests using JWT
const authMiddleware = async (req, res, next) => {
  // Extract the token from the Authorization header, if available
  const token = req.headers['authorization']?.split(' ')[1];

  // If no token is found, deny access, Return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    // Verify and decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    // Fetch the user by decoded ID and attach it to the request object
    req.user = await User.findById(decoded.id); 
    
     // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    
    // Handle errors (e.g., invalid or expired token)
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
