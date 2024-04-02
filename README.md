# User Management System

This is a web application built with React, Node.js, Express, and MongoDB for managing user data and teams.

## Features

 - **User Management**: View, edit, and delete user information.
 - **Create New User**: Add a new user to the system.
 - **Team Management**: Create teams by selecting multiple users.
 - **View Team Information**: View detailed information about teams, including members' details.

## Technologies Used

 **Frontend**
  - React
  - React Router
  - React Icons
  - Axios
  - dotenv

 **Backend**
  - Express
  - Mongoose
  - Body-parser
  - CORS
  - dotenv

## Getting Started

To run this application locally, follow these steps:

 1. Clone this repository to your local machine.
 2. Navigate to the project directory.
 3. Install dependencies for the frontend and backend:
    
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install

 4. Create a '.env' file in both the frontend and backend directories, and add necessary environment variables.
 5. Start the frontend and backend servers:

    ```bash
    cd frontend
    npm run dev
    cd ../backend
    node index.js

 6. Open your browser and go to 'http://localhost:5173' to access the application.