// src/api.js
import axios from 'axios';

// Base URL for the backend API
const API_URL = 'http://localhost:5000/api'; // Backend URL

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

// Auth functions
export const register = (userData) => api.post('/auth/register', userData); // Register a new user
export const login = (userData) => api.post('/auth/login', userData); // Log in an existing user

// Expense functions
 
// Create a new expense
export const createExpense = (expenseData, token) =>
  api.post('/expenses', expenseData, { headers: { Authorization: `Bearer ${token}` } });

// Fetch all expenses for the logged-in user
export const getExpenses = (token) =>
  api.get('/expenses', { headers: { Authorization: `Bearer ${token}` } });

// Update an existing expense
export const updateExpense = (id, expenseData, token) =>
  api.patch(`/expenses/${id}`, expenseData, { headers: { Authorization: `Bearer ${token}` } });

// Delete an expense
export const deleteExpense = (id, token) =>
  api.delete(`/expenses/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Task functions

// Create a new task
export const createTask = (taskData, token) =>
  api.post('/tasks', taskData, { headers: { Authorization: `Bearer ${token}` } });

// Fetch all tasks for the logged-in user
export const getTasks = (token) =>
  api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });

// Update a task
export const updateTask = (id, taskData, token) =>
  api.patch(`/tasks/${id}`, taskData, { headers: { Authorization: `Bearer ${token}` } });

// Delete a task
export const deleteTask = (id, token) =>
  api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export default api;
