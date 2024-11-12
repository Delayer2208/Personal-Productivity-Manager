import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import { useNavigate } from 'react-router-dom';

const Tasks = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch tasks from the backend
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

  // Handle task creation and updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTaskId) {
      try {
        await updateTask(editingTaskId, { title }, token);
        setEditingTaskId(null); // Reset editing state after update
      } catch (error) {
        console.error(error);
        setError('Failed to update task.');
      }
    } else {
      try {
        await createTask({ title }, token);
      } catch (error) {
        console.error(error);
        setError('Failed to create task.');
      }
    }
    setTitle(''); // Reset title input
    fetchTasks(); // Refresh tasks list
  };

  // Prepare task for editing
  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingTaskId(task._id);
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id, token);
      fetchTasks();
    } catch (error) {
      console.error(error);
      setError('Failed to delete task.');
    }
  };

  // Toggle task completion
  const handleToggleComplete = async (id, isCompleted) => {
    try {
      await updateTask(id, { isCompleted: !isCompleted }, token);
      fetchTasks();
    } catch (error) {
      console.error(error);
      setError('Failed to toggle task completion.');
    }
  };

  // Navigate to other pages
  const goToExpenses = () => {
    navigate('/expenses');
  };

  const goToHomepage = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Your Tasks</h2>
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-control mb-2"
            />
            <button type="submit" className="btn btn-primary w-100">
              {editingTaskId ? 'Update Task' : 'Add Task'}
            </button>
          </form>

          <ul className="list-group">
            {tasks.map((task) => (
              <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                  {task.title}
                </span>
                <div>
                  <button
                    onClick={() => handleEdit(task)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-danger btn-sm me-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleToggleComplete(task._id, task.isCompleted)}
                    className="btn btn-success btn-sm"
                  >
                    {task.isCompleted ? 'Undo' : 'Done'}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <button onClick={goToExpenses} className="btn btn-secondary me-2">Go to Expenses</button>
            <button onClick={goToHomepage} className="btn btn-secondary">Go to Homepage</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Tasks;
