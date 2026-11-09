# Blog Application

## 1. Project Overview

The Blog Application is a full-stack web application that allows users to register, log in, create, view, edit, and delete blog posts.

The application provides a simple and user-friendly interface with secure user authentication and MongoDB database integration.

## 2. Objectives

- To develop a full-stack blog application.
- To implement user registration and login.
- To allow users to create and manage blog posts.
- To store user and blog information in MongoDB.
- To implement REST API operations.
- To provide authentication using JSON Web Tokens (JWT).

## 3. Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- REST API
- JSON Web Token (JWT)
- bcryptjs

### Database
- MongoDB
- Mongoose
- MongoDB Compass

### Development and Testing Tools
- Visual Studio Code
- Postman
- Web Browser

## 4. Main Modules

1. **Home Page:** Displays the application homepage.
2. **Registration:** Allows new users to create an account.
3. **Login:** Authenticates registered users.
4. **Dashboard:** Displays user profile and personal blogs.
5. **Create Blog:** Allows users to publish new blog posts.
6. **View Blog:** Displays blog details.
7. **Edit Blog:** Allows users to update their blog posts.
8. **Delete Blog:** Allows users to delete their blog posts.
9. **Logout:** Ends the user's login session.

## 5. Key Features

- User registration and login.
- Password hashing.
- JWT-based authentication.
- Create, Read, Update and Delete (CRUD) operations.
- MongoDB database integration.
- Personal dashboard.
- Blog category and author information.
- Protected API routes.

## 6. How to Run the Project

### Step 1: Install Dependencies

Open the backend folder in the terminal and run:

```bash
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the project root and configure the required environment variables locally.

Do not upload the actual `.env` file or secret keys.

### Step 3: Start the Backend Server

```bash
npm start
```

### Step 4: Open the Application

Open the following URL in your browser:

http://localhost:5000/index.html

## 7. API Testing

The following APIs were tested using Postman:

- GET /api/health
- POST /api/register
- POST /api/login
- GET /api/profile
- POST /api/blogs
- GET /api/blogs
- GET /api/my-blogs
- PUT /api/blogs/:id
- DELETE /api/blogs/:id

The API responses were verified successfully during testing.

## 8. Database

MongoDB is used to store user information and blog posts.

MongoDB Compass was used to verify database records and blog operations.

## 9. Security

- Passwords are hashed using bcryptjs.
- JWT is used for authentication.
- Protected API routes require a valid token.
- Login sessions are cleared during logout.
- Unauthorized API requests are rejected.

## 10. Conclusion

The Blog Application successfully demonstrates full-stack web development using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

The project helped in understanding frontend development, backend API integration, database management, authentication, and CRUD operations.
