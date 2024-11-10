const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const taskRoutes = require('./routes/tasks'); // Import tasks routes
const expenseRoutes = require('./routes/expenses'); // Import expenses routes
const authRoutes = require('./routes/auth'); // Import auth routes

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Accept requests from a specific frontend URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
})); // Allow CORS for specific methods

app.use(express.json()); // Middleware to parse JSON requests

const PORT = process.env.PORT || 5000;

// Register routes
app.use('/api/tasks', taskRoutes); // registers the task routes
app.use('/api/expenses', expenseRoutes); // registers the expense routes
app.use('/api/auth', authRoutes); // registers the authentication routes under the /api/auth endpoint

app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
