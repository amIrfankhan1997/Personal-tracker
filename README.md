echo "# Personal Tracker Project

This project is a personal tracker built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to track and manage expenses, with a feature to detect duplicate expenses to prevent entering the same record multiple times.

## Table of Contents

1. [Installation](#installation)
2. [Running the Backend Server](#running-the-backend-server)
3. [Starting the Frontend Application](#starting-the-frontend-application)
4. [Running Tests](#running-tests)
5. [Assumptions Made During Development](#assumptions-made-during-development)
6. [Duplicate Expense Detection Feature](#duplicate-expense-detection-feature)

## Installation

### Backend Dependencies

1. Navigate to the \`backend\` directory:

   cd server

2. Install the necessary backend dependencies:

   npm init
   npm i express cors
   npm install --save-dev jest jest-dom @testing-library/dom @testing-library/jest-dom

### Frontend Dependencies

1. Navigate to the \`frontend\` directory:

   cd expense-tracker

2. Install the necessary frontend dependencies:

   npm install
   npm axios
   npm install --save-dev jest jest-dom @testing-library/dom @testing-library/jest-dom

## Running the Backend Server

To start the backend server:

1. Navigate to the \`backend\` directory:

   cd server

2. Start the server:

   npm start

   The backend server will be running at [http://localhost:4000](http://localhost:4000).

## Starting the Frontend Application

To start the frontend application:

1. Navigate to the \`frontend\` directory:

   cd expense-tracker

2. Start the frontend application:

   npm start

   The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Running Tests

### Backend Tests

To run tests for the backend:

1. Navigate to the \`backend\` directory:

   cd server

2. Run the tests:

   npm test

### Frontend Tests

To run tests for the frontend:

1. Navigate to the \`frontend\` directory:

   cd expense-tracker

2. Run the tests:

   npm test

## Assumptions Made During Development

1. The project assumes basic knowledge of the MERN stack.
2. MongoDB is assumed to be set up locally or remotely, and connection details are configured in the backend.
3. Node.js and npm are assumed to be installed globally on your system.
4. Authentication is not included in this project as it focuses on expense tracking and duplicate detection functionality.

## Duplicate Expense Detection Feature

The duplicate expense detection feature was implemented to help users avoid entering the same expense multiple times. The following approach was used:

1. **Unique Identifier**: Each expense is identified by a combination of expense name, amount, and date.
2. **Check for Duplicates**: When a new expense is entered, the system checks the database to see if an existing record matches the new entry based on the unique identifiers.
3. **User Alert**: If a duplicate is found, the user is notified and can either update the existing record or discard the new entry.
4. **Hashing Technique**: To optimize the detection, a hashing technique is used for efficient comparison of expenses.
