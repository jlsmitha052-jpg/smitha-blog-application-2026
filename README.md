# Blog Application – Full Stack Web Development

A full-stack Blog Application developed as part of the **Codomax Virtual Internship 2026**.

## Features

- Create new blog posts
- View all published blogs
- View individual blog details
- Edit existing blogs
- Delete blogs
- Search blogs by title or author
- Filter blogs by category
- User registration and login
- MongoDB database integration
- Responsive and user-friendly interface

## Technologies Used

**Frontend:** HTML, CSS, JavaScript

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Authentication:** bcryptjs

## Blog Categories

- Technology
- Education
- Health
- Lifestyle
- Travel
- Other

## CRUD Operations

- Create – Add new blog posts
- Read – Display all blogs and individual details
- Update – Edit existing blog posts
- Delete – Remove blog posts

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/register` | Register user |
| POST | `/api/login` | Login user |
| POST | `/api/blogs` | Create blog |
| GET | `/api/blogs` | Get all blogs |
| GET | `/api/blogs/:id` | Get one blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |

Search and category filters are supported through the GET `/api/blogs` endpoint.

## How to Run the Project

1. Install Node.js and MongoDB.
2. Open the backend folder in the terminal.
3. Install dependencies:

   `npm install`

4. Start the server:

   `npm start`

5. Open `http://localhost:5000/index.html` in your browser.

## Internship

**Program:** Codomax Virtual Internship 2026

**Domain:** Full Stack Web Development

**Module:** CRUD Operations

## Author

Developed as an internship project by Smitha.
