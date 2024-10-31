// src/pages/Expenses.js
import React, { useEffect, useState, useCallback } from 'react';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../api';

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

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getExpenses(token);
      setExpenses(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to fetch expenses.');
      // Check for unauthorized access
      if (error.response && error.response.status === 401) {
        handleLogout(); // Log out if the token is invalid
      }
    } finally {
      setLoading(false);
    }
  }, [token, handleLogout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingExpenseId) {
      // Update expense
      try {
        await updateExpense(editingExpenseId, { title, amount, category, date, notes }, token);
        setEditingExpenseId(null);
      } catch (error) {
        console.error(error);
        setError('Failed to update expense.');
      }
    } else {
      // Create new expense
      try {
        await createExpense({ title, amount, category, date, notes }, token);
      } catch (error) {
        console.error(error);
        setError('Failed to create expense.');
      }
    }
    // Reset fields and fetch updated expenses
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setNotes('');
    fetchExpenses();
  };

  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setNotes(expense.notes);
    setEditingExpenseId(expense._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id, token);
      fetchExpenses();
    } catch (error) {
      console.error(error);
      setError('Failed to delete expense.');
    }
  };

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
        </>
      )}
    </div>
  );
};

export default Expenses;
