# Task Management System Backend API

This is a RESTful API for a Task Management System built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
The API supports user authentication, project management, task creation, assignment, completion, and retrieval of project task statistics.

---

## Features

- User registration and login with JWT authentication
- Create and manage projects
- Add tasks to projects
- Assign tasks to users
- Mark tasks as complete
- Retrieve statistics such as completed tasks per project

---

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- dotenv for environment variable management

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [npm](https://www.npmjs.com/)

---

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/Task-Management-System.git
**2.Install dependencies:**
npm install
3.Set up environment variables:

Create a .env file in the root directory with the following variables:
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=yourSuperSecretKey1234567890!

PORT=5000
Start the server:
npm run dev
