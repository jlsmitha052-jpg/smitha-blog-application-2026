
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const PORT = 5000;

const categories = [
    "Technology",
    "Education",
    "Health",
    "Lifestyle",
    "Travel",
    "Other"
];

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FRONTEND
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/blog_application")
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch(error => console.log("MongoDB Error:", error.message));

// USER SCHEMA
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// BLOG SCHEMA
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    category: {
        type: String,
        enum: categories,
        default: "Other"
    },
    excerpt: { type: String, default: "" },
    content: { type: String, required: true },
    userId: { type: String, default: "" }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

// HOME
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// HEALTH CHECK
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend server is working!"
    });
});

// REGISTER
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
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
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
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
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
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
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
});

// CREATE BLOG
app.post("/api/blogs", async (req, res) => {
    try {
        const { title, author, content, category } = req.body;

        if (!title || !author || !content) {
            return res.status(400).json({
                success: false,
                message: "Title, author and content are required"
            });
        }

        const selectedCategory = category || "Other";

        if (!categories.includes(selectedCategory)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }

        const blog = await Blog.create({
            title: title.trim(),
            author: author.trim(),
            content,
            category: selectedCategory
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully!",
            blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating blog",
            error: error.message
        });
    }
});

// READ BLOGS + SEARCH + CATEGORY FILTER
app.get("/api/blogs", async (req, res) => {
    try {
        const { search, category } = req.query;

        // DEBUGGING
        console.log("SEARCH VALUE:", search);
        console.log("CATEGORY VALUE:", category);

        const filter = {};

        // SEARCH TITLE AND AUTHOR
        if (search && search.trim() !== "") {
            const safeSearch = search.trim().replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            filter.$or = [
                {
                    title: {
                        $regex: safeSearch,
                        $options: "i"
                    }
                },
                {
                    author: {
                        $regex: safeSearch,
                        $options: "i"
                    }
                }
            ];
        }

        // CATEGORY FILTER
        if (category && category !== "") {
            if (!categories.includes(category)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category"
                });
            }

            if (category === "Other") {
                filter.$and = [
                    {
                        $or: [
                            { category: "Other" },
                            { category: { $exists: false } },
                            { category: null }
                        ]
                    }
                ];
            } else {
                filter.category = category;
            }
        }

        console.log("MONGODB FILTER:", JSON.stringify(filter));

        const blogs = await Blog.find(filter)
            .sort({ createdAt: -1 });

        console.log("RESULT COUNT:", blogs.length);

        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully!",
            blogs
        });

    } catch (error) {
        console.error("Fetch blogs error:", error);

        res.status(500).json({
            success: false,
            message: "Error fetching blogs",
            error: error.message
        });
    }
});

// GET SINGLE BLOG
app.get("/api/blogs/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID"
            });
        }

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            message: "Blog fetched successfully!",
            blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching blog",
            error: error.message
        });
    }
});

// UPDATE BLOG
app.put("/api/blogs/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID"
            });
        }

        const { title, author, content, category } = req.body;
        const updates = {};

        if (title !== undefined) updates.title = title;
        if (author !== undefined) updates.author = author;
        if (content !== undefined) updates.content = content;

        if (category !== undefined) {
            if (!categories.includes(category)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category"
                });
            }

            updates.category = category;
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            message: "Blog updated successfully!",
            blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating blog",
            error: error.message
        });
    }
});

// DELETE BLOG
app.delete("/api/blogs/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID"
            });
        }

        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        res.json({
            success: true,
            message: "Blog deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting blog",
            error: error.message
        });
    }
});

// START SERVER
app.listen(PORT, () => {
    console.log("BLOG APPLICATION SERVER");
    console.log("Server: http://localhost:" + PORT);
    console.log("Frontend: " + frontendPath);
});
