const express = require('express'); // Import express for routing
const User = require('../models/user'); // Import the User model for database interaction
const jwt = require('jsonwebtoken'); // Import jwt for creating authentication tokens
const router = express.Router();  // Create a new Express router

// Register route to create a new user
router.post('/register', async (req, res) => {
    const { email, password } = req.body; // Get email and password from request body
  
    try {
      // Check if a user with the given email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
       // Create a new user instance and save it to the database
      const user = new User({ email, password });
      await user.save(); // Save new user to the database
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle any errors that occur during the registration process
    }
    }
);
  
// Login route to authenticate the user and provide a JWT token
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Get email and password from request body
  
    try {
      const user = await User.findOne({ email }); // Find the user in the database by email 
      if (!user) return res.status(404).json({ message: 'User not found' }); // Handle case where user does not exist
  
      const isMatch = await user.comparePassword(password); // Use comparePassword to check password
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' }); // Handle incorrect password
  
      // Generate a JWT token with the user's id and a secret key
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token }); // Send back the token
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle server error
    }
});

module.exports = router; // Export the router
