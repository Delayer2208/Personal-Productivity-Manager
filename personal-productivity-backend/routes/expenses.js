const express = require('express');
const Expense = require('../models/expense'); // expenses model location
const authMiddleware = require('../middleware/auth'); // Import auth middleware
const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Utility function for handling error responses
const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

// Create a new expense
router.post('/', async (req, res) => {
  const { title, amount, category, date, notes } = req.body;

  // Validate required fields
  if (!title || !amount) {
    return sendErrorResponse(res, 400, 'Title and amount are required.');
  }

  // Parse the amount and validate it
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount)) {
    return sendErrorResponse(res, 400, 'Amount must be a number.');
  }

  // Handle date: parse it, default to current date if empty
  const parsedDate = date ? new Date(date) : Date.now();
  if (isNaN(parsedDate)) {
    return sendErrorResponse(res, 400, 'Invalid date format.');
  }

  // Create a new expense object
  const expense = new Expense({
    userId: req.user.id,
    title,
    amount: parsedAmount, // Use parsed amount
    category: category || 'others', // Default to 'others' if no category
    date: parsedDate,
    notes: notes || '', // Default to empty string if no notes
  });

  try {
    // Save the expense to the database
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
});

// Get all expenses for the authenticated
router.get('/', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  try {
    const expenses = await Expense.find({ userId: req.user.id })
      .skip((page - 1) * limit) // Skip expenses based on page number
      .limit(Number(limit)); // Limit the number of expenses per page

    res.json(expenses);
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

// Get a single expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user.id });
    if (!expense) return sendErrorResponse(res, 404, 'Expense not found');
    res.json(expense);
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

// Update an expense by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedExpense) return sendErrorResponse(res, 404, 'Expense not found');
    res.json(updatedExpense);
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
});

// Delete an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedExpense) return sendErrorResponse(res, 404, 'Expense not found');
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

module.exports = router; // Export the expense routes
