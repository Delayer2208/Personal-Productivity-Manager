// src/pages/Expenses.js
import React, { useEffect, useState, useCallback } from 'react';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../api';
import { useNavigate } from 'react-router-dom';

// Expense management page: view, add, edit, delete expenses
const Expenses = ({ token, handleLogout }) => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetches expenses from the API and handles errors
  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getExpenses(token);
      setExpenses(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to fetch expenses.');
      
      // Logout if token has expired or is invalid
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [token, handleLogout]);

  // Creates or updates an expense based on editingExpenseId
  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = {
      title,
      amount,
      category: category || 'others', // Default to 'others' if category is empty
      date,
      notes,
    };

    if (editingExpenseId) {
      try {
        await updateExpense(editingExpenseId, expenseData, token);
        setEditingExpenseId(null);
      } catch (error) {
        console.error("Failed to update expense:", error);
        setError('Failed to update expense.');
      }
    } else {
      try {
        await createExpense(expenseData, token);
      } catch (error) {
        console.error("Failed to create expense:", error);
        setError('Failed to create expense.');
      }
    }

    // Reset fields and refresh expenses
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setNotes('');
    fetchExpenses();
  };

  // Sets form fields for editing an expense
  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setNotes(expense.notes);
    setEditingExpenseId(expense._id);
  };

   // Deletes the selected expense and updates the list
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id, token);
      fetchExpenses();
    } catch (error) {
      console.error(error);
      setError('Failed to delete expense.');
    }
  };

  // Navigate to Tasks page
  const goToTasks = () => {
    navigate('/tasks');
  };

  // Navigate to Homepage
  const goToHomepage = () => {
    navigate('/');
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

  // Load expenses on component mount
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div>
      <h2>Your Expenses</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button type="submit">{editingExpenseId ? 'Update Expense' : 'Add Expense'}</button>
          </form>
          <ul>
            {expenses.map((expense) => (
              <li key={expense._id}>
                <strong>{expense.title}</strong> - ${expense.amount} - {expense.category}
                <button onClick={() => handleEdit(expense)}>Edit</button>
                <button onClick={() => handleDelete(expense._id)}>Delete</button>
              </li>
            ))}
          </ul>

          <h3>Total Expenses: ${totalExpenses}</h3> {/* Display total expenses */}
          
          <button onClick={goToTasks}>Tasks</button>
          <button onClick={goToHomepage}>Homepage</button>
        </>
      )}
    </div>
  );
};

export default Expenses;
