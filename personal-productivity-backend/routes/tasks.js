const express = require('express');
const Task = require('../models/Task'); // Task Model Location
const authMiddleware = require('../middleware/auth'); // Import auth middleware
const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Utility function for handling error responses
const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

// Create a new task
router.post('/', async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  // Validate required fields
  if (!title) {
    return sendErrorResponse(res, 400, 'Title is required.');
  }

  // Use the userId from the request (from the middleware)
  const task = new Task({ userId: req.user.id, title, description, priority, dueDate });

  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
});

// Get all tasks for the authenticated user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }); // Only fetch tasks for the authenticated user
    res.json(tasks);
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

// Get a task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id }); // Ensure the user owns the task
    if (!task) return sendErrorResponse(res, 404, 'Task not found');
    res.json(task);
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

// Update a task by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedTask) return sendErrorResponse(res, 404, 'Task not found');
    res.json(updatedTask);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedTask) return sendErrorResponse(res, 404, 'Task not found');
    res.json({ message: 'Task deleted' });
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

module.exports = router; // Export the task routes
