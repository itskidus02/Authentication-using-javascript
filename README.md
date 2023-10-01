# Multi-Level Authentication Project with OAuth Integration

This project is a multi-level authentication system implemented in JavaScript. It provides a secure user authentication process using email and password while also offering the convenience of OAuth login through Google. Users must be registered to access the secret page, and they can log in if they have previously created an account. Passwords are securely stored using hashing and salt rounds in a MongoDB database.

# Table of Contents
- Features
- Prerequisites
- Installation
- Usage
- Configuration

# Features
- User Registration: Users can create an account by providing their email and password.

- Multi-Level Authentication:

   - Email and Password: Users can log in using their registered email and password.
   - OAuth with Google: Users can log in using their Google account, making the login process faster and more convenient.
- Password Security:

Passwords are securely hashed and stored in the MongoDB database with salt rounds to enhance security.
- Access Control:

Only registered users can access the secret page.
# Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB database set up and running.
# Installation
# 1. Clone the repository:

on bash
Copy code
- git clone https://github.com/itskidus02/Authentication-using-javascript.git
# 2. Navigate to the project directory:

on bash
Copy code
- cd Authentication-using-javascript
# 3. Install the project dependencies:

on bash
Copy code
- npm install
# Usage
- 1 . Start the application:

on bash
Copy code
   npm start
- 2 . Access the application in your web browser:

text
Copy code
- http://localhost:3000
- 3 . Follow the on-screen instructions to register or log in using email and password, or use the "Log in with Google" button for OAuth authentication.

# Configuration
You need to configure the following environment variables in a .env file in the project root directory:

- MONGODB_URI: The MongoDB connection URI.
- SESSION_SECRET: A secret key for session management (e.g., for cookies).

