
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Frontend folder
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/blog_application")
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(err => console.log("MongoDB Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Blog Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is working!"
    });
});

// REGISTER
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 8 characters!"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Registration successful!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Registration failed!"
        });
    }
});

// LOGIN
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required!"
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password!"
            });
        }

        res.json({
            success: true,
            message: "Login successful!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Login failed!"
        });
    }
});

// CREATE BLOG
app.post("/api/blogs", async (req, res) => {
    try {
        const { title, author, content } = req.body;

        if (!title || !author || !content) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        const blog = await Blog.create({
            title,
            author,
            content
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully!",
            blog
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Blog creation failed!"
        });
    }
});

// READ BLOGS
app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            message: "Blogs fetched successfully!",
            blogs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch blogs!"
        });
    }
});

// READ SINGLE BLOG
app.get("/api/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found!"
            });
        }

        res.json({ success: true, blog });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid blog ID!"
        });
    }
});

// UPDATE BLOG
app.put("/api/blogs/:id", async (req, res) => {
    try {
        const { title, author, content } = req.body;

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, author, content },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found!"
            });
        }

        res.json({
            success: true,
            message: "Blog updated successfully!",
            blog
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Blog update failed!"
        });
    }
});

// DELETE BLOG
app.delete("/api/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found!"
            });
        }

        res.json({
            success: true,
            message: "Blog deleted successfully!"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Blog deletion failed!"
        });
    }
});

// START SERVER
const PORT = 5000;

app.listen(PORT, () => {
    console.log("BLOG APPLICATION SERVER");
    console.log("Server: http://localhost:" + PORT);
    console.log("Frontend: " + frontendPath);
});
