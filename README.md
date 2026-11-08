# Blog Application

A Full Stack Blog Application developed as part of the **CODOMAX Virtual Internship 2026 – Full Stack Web Development**.

## About the Project

The Blog Application allows users to create, view, edit, and delete blog posts. It uses MongoDB to store blog data permanently and Node.js with Express.js to handle backend operations.

## Features

- User Registration
- User Login
- Create Blog Posts
- View All Blogs
- View Individual Blog Details
- Edit Existing Blogs
- Delete Blog Posts
- MongoDB Database Integration
- Password Hashing using bcryptjs
- Responsive User Interface

## Technologies Used

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js
- REST API

**Database**
- MongoDB
- Mongoose

**Security**
- bcryptjs for password hashing

## Project Structure

```text
GitHub-Upload/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── index.html
    ├── login.html
    ├── register.html
    ├── dashboard.html
    ├── blog-details.html
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jlsmitha052-jpg/smitha-blog-application-2026.git
```

### 2. Open Backend Folder

```bash
cd smitha-blog-application-2026/GitHub-Upload/backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start MongoDB

Make sure MongoDB is installed and running.

### 5. Start the Application

```bash
npm start
```

### 6. Open in Browser

```text
http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/health | Check server |
| POST | /api/register | Register user |
| POST | /api/login | Login user |
| POST | /api/blogs | Create blog |
| GET | /api/blogs | Get all blogs |
| GET | /api/blogs/:id | Get individual blog |
| PUT | /api/blogs/:id | Update blog |
| DELETE | /api/blogs/:id | Delete blog |

## Database

MongoDB is used to store user information and blog posts.

## Internship

**Program:** CODOMAX Virtual Internship 2026

**Domain:** Full Stack Web Development

## Author

**Smitha**

Computer Science and Engineering Student

## Acknowledgement

Thanks to Codomax Digital Solutions for providing the opportunity to learn and develop this Full Stack Blog Application.
