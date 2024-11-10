// Import dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema with email and password fields
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Method to compare provided password with hashed password in the database
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Middleware to hash password before saving user document to the database
userSchema.pre('save', async function(next) {
   
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
   
  // Hash the password with a salt factor of 10
  this.password = await bcrypt.hash(this.password, 10);
  next(); // Move to the next middleware or save operation
});

// Create the User model from the schema and export it
const User = mongoose.model('User', userSchema);
module.exports = User;
