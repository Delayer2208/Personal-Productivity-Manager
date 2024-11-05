# Personal Productivity and Finance Manager

A full-stack project for managing personal tasks and tracking expenses.

## Features
- User authentication: Register and log in securely.
- Task Management: Add, update, and delete tasks.
- Expense Tracking: Track expenses by category, date, and amount.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Axios for API requests

### Prerequisites
1. Install **MongoDB**: Download and install MongoDB from [the official MongoDB website](https://www.mongodb.com/try/download/community).
2. (Optional) Install **MongoDB Compass**: This is a GUI for MongoDB, which helps in visualizing and managing your database.

## Installation
1.   Backend Setup
   Clone the repository:
   git clone https://github.com/yourusername/your-repo-name.git
  Navigate to backend direcotry
  cd backend
  npm install //installs dependencies
  npm install dotenv //dotenv package to load environment variables

2. Create .env
   MONGO_URI=mongodb://localhost:27017/your-db-name
   JWT_SECRET=YourSecretKey //Seperate lines
   
3.  Start the server
   node server.js

4.  Frontend Setup
   Navigate to frontend directory
   cd frontend
   npm install //installs dependencies
   npm install axios //to fetch tasks from a backend API

    
5.   Start Frontend
    npm start
