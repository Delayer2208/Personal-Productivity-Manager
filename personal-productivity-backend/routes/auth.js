const express = require('express');
const User = require('../models/user'); // Ensure this path is correct
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { email, password } = req.body; // Get email and password from request body
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
      const user = new User({ email, password });
      await user.save(); // Save new user to the database
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Get email and password from request body
  
    try {
      const user = await User.findOne({ email }); // Find the user by email
      if (!user) return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
  
      const isMatch = await user.comparePassword(password); // Use comparePassword to check password
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' }); // Handle incorrect password
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token }); // Send back the token
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle server error
    }
});

module.exports = router; // Export the router
