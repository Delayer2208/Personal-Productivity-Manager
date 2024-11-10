// models/expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // Title is required
  amount: { type: Number, required: true }, // Amount is required
  category: { 
    type: String, 
    enum: ['food', 'rent', 'utilities', 'transport', 'others'], // Ensure matching case in requests
    default: 'others' 
  },
  date: { type: Date, default: Date.now }, // Default to current date if not provided
  notes: { type: String } // Optional notes
});

// Create and export the Expense model based on the expense schema
const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
