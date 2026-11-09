# Blog Application

## Project Overview

The Blog Application is a full-stack web application that allows users to register, log in, create, view, edit, and delete blog posts.

The application is developed using HTML, CSS, and JavaScript for the frontend, Node.js and Express.js for the backend, and MongoDB Atlas for permanent data storage.

It provides a simple and user-friendly platform for sharing thoughts and ideas through blog posts.

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication and Security
- bcryptjs
- JSON Web Token (JWT)
- dotenv

### API Testing
- Postman

## Features

1. User Registration
2. User Login
3. User Logout
4. Secure Password Hashing
5. Create Blog Posts
6. View All Blogs
7. View Individual Blog Posts
8. Edit Existing Blogs
9. Delete Blog Posts
10. User Dashboard
11. View Personal Blogs
12. MongoDB Atlas Database Integration
13. REST API Integration
14. JWT-based Authentication

## Project Structure

```text
blog_application/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── dashboard.html
│   ├── create-blog.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
├── .env
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

Install the following software:

- Node.js
- npm
- Visual Studio Code
- MongoDB Atlas account

### Step 1: Open the Project

Open the project folder in Visual Studio Code.

### Step 2: Open Backend Folder

Open the terminal and navigate to the backend folder:

```bash
cd backend
```

### Step 3: Install Dependencies

Install the required packages:

```bash
npm install
```

The project uses the following packages:

- express
- mongoose
- cors
- bcryptjs
- jsonwebtoken
- dotenv

### Step 4: Configure Environment Variables

Create a `.env` file in the project root folder.

Add the following configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Replace the placeholder values with your own configuration. Keep the `.env` file private and never upload it to GitHub.

### Step 5: Start the Backend Server

Run the following command from the backend folder:

```bash
npm start
```

If the server starts successfully, it will run at:

```text
http://localhost:5000
```

### Step 6: Open the Application

Open the following URL in your browser:

```text
http://localhost:5000/index.html
```

## Database

The application uses MongoDB Atlas for permanent data storage.

- Database: blog_application
- Database Service: MongoDB Atlas
- ODM: Mongoose
- Connection: Configured through environment variables.

The database stores user information and blog posts.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/health | Check server status |
| POST | /api/register | Register a new user |
| POST | /api/login | Authenticate user |
| GET | /api/blogs | View all blogs |
| GET | /api/blogs/:id | View a single blog |
| POST | /api/blogs | Create a new blog |
| PUT | /api/blogs/:id | Update an existing blog |
| DELETE | /api/blogs/:id | Delete a blog |
| GET | /api/profile | Get user profile |
| GET | /api/my-blogs | View user's blogs |

Protected API endpoints require valid JWT authentication.

## Testing

The application APIs were tested using Postman.

The following functionalities were tested:

- Backend health check
- User registration
- User login
- Blog creation
- Blog retrieval
- Blog editing
- Blog deletion
- MongoDB Atlas database connectivity

## Security

- Passwords are hashed using bcryptjs.
- JWT is used for user authentication.
- Environment variables are used for sensitive configuration.
- Protected routes require authentication.

## Conclusion

The Blog Application demonstrates full-stack web development using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB Atlas.

It provides essential blog management features such as user registration, login, creating, viewing, editing, and deleting blog posts.

This project helped demonstrate practical knowledge of frontend development, backend development, REST APIs, database integration, and user authentication.

## Project Information

**Project Name:** Blog Application

**Program:** Full Stack Web Development Virtual Internship – 2026

**Project Type:** Full Stack Web Development

**Status:** Core application features implemented and tested.
