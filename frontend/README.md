# Blog Application

## Project Overview
The Blog Application is a full-stack web application that allows users to create, view, edit, and delete blog posts. It uses Node.js and Express.js for the backend and MongoDB for permanent data storage.

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs

## Features
1. User Registration
2. User Login and Logout
3. Create Blog Posts
4. View All Blogs
5. Edit Existing Blogs
6. Delete Blogs
7. Dashboard
8. MongoDB Permanent Storage

## Project Structure
```text
blog_application/
│
├── backend/
│   └── server.js
│
└── frontend/
    ├── index.html
    ├── register.html
    ├── login.html
    ├── dashboard.html
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Installation and Setup

1. Install Node.js and MongoDB.
2. Open the project folder in VS Code.
3. Open the backend folder in the terminal.
4. Install the required packages:

```bash
npm install express mongoose cors bcryptjs
```

5. Start the backend server:

```bash
node server.js
```

6. Open the application in your browser:

```text
http://localhost:5000/index.html
```

## Database
- Database: blog_application
- MongoDB URI: mongodb://127.0.0.1:27017/blog_application

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/health | Check server |
| POST | /api/register | Register user |
| POST | /api/login | Login user |
| POST | /api/blogs | Create blog |
| GET | /api/blogs | View blogs |
| GET | /api/blogs/:id | View one blog |
| PUT | /api/blogs/:id | Update blog |
| DELETE | /api/blogs/:id | Delete blog |

## Conclusion
The Blog Application demonstrates full-stack web development using Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript. It provides basic blog management functionality with database integration.