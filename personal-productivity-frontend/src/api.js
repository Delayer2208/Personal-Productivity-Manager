// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust to your backend URL

const api = axios.create({
  baseURL: API_URL,
});

// Auth functions
export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);

// Expense functions
export const createExpense = (expenseData, token) =>
  api.post('/expenses', expenseData, { headers: { Authorization: `Bearer ${token}` } });

export const getExpenses = (token) =>
  api.get('/expenses', { headers: { Authorization: `Bearer ${token}` } });

// Update an expense
export const updateExpense = (id, expenseData, token) =>
  api.patch(`/expenses/${id}`, expenseData, { headers: { Authorization: `Bearer ${token}` } });

// Delete an expense
export const deleteExpense = (id, token) =>
  api.delete(`/expenses/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Task functions
export const createTask = (taskData, token) =>
  api.post('/tasks', taskData, { headers: { Authorization: `Bearer ${token}` } });

export const getTasks = (token) =>
  api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });

// Update a task
export const updateTask = (id, taskData, token) =>
  api.patch(`/tasks/${id}`, taskData, { headers: { Authorization: `Bearer ${token}` } });

// Delete a task
export const deleteTask = (id, token) =>
  api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export default api;
