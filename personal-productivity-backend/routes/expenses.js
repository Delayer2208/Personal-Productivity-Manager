const express = require('express');
const Expense = require('../models/expense'); // expenses model location
const authMiddleware = require('../middleware/auth'); // Import auth middleware
const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create a new expense
router.post('/', async (req, res) => {
  console.log(req.body); // Log the incoming request body

  // Destructure fields from request body
  const { title, amount, category, date, notes } = req.body;

  // Validate required fields
  if (!title || !amount) {
    return res.status(400).json({ message: 'Title and amount are required.' });
  }

  // Use the userId from the request (from the middleware)
  const expense = new Expense({ userId: req.user.id, title, amount, category, date, notes });

  try {
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }); // Only fetch expenses for the authenticated user
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user.id }); // Ensure the user owns the expense
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an expense
router.patch('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
    if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
     // Delete the expense, ensuring it's the user's expense (userId check)
    const deletedExpense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' }); // Return success message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; // Export the expense routes
