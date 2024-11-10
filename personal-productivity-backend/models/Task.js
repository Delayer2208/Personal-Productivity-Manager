const mongoose = require('mongoose'); // Import Mongoose to interact with MongoDB

// Define the task schema
const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date },
  isCompleted: { type: Boolean, default: false }
});

// Create and export the Task model based on the task schema
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;