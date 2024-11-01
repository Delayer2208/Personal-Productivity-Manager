// src/pages/Tasks.js
import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Tasks = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getTasks(token);
      setTasks(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTaskId) {
      // Update task
      try {
        await updateTask(editingTaskId, { title }, token);
        setEditingTaskId(null);
      } catch (error) {
        console.error(error);
        setError('Failed to update task.');
      }
    } else {
      // Create new task
      try {
        await createTask({ title }, token);
      } catch (error) {
        console.error(error);
        setError('Failed to create task.');
      }
    }
    setTitle('');
    fetchTasks();
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingTaskId(task._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      fetchTasks();
    } catch (error) {
      console.error(error);
      setError('Failed to delete task.');
    }
  };

  // Function to navigate to Expenses page
  const goToExpenses = () => {
    navigate('/expenses');
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <h2>Your Tasks</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
          </form>
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                {task.title}
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </li>
            ))}
          </ul>

          {/* Button to navigate to Expenses page */}
          <button onClick={goToExpenses}>Go to Expenses</button>
        </>
      )}
    </div>
  );
};

export default Tasks;
