
const API_URL = "/api/blogs";

document.addEventListener("DOMContentLoaded", function () {
    const blogForm = document.getElementById("blogForm");
    const blogList = document.getElementById("blogList");
    const message = document.getElementById("message");
    const refreshBtn = document.getElementById("refreshBtn");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    async function loadBlogs() {
        blogList.textContent = "Loading blogs...";

        try {
            const params = new URLSearchParams();

            if (searchInput.value.trim()) {
                params.append("search", searchInput.value.trim());
            }

            if (categoryFilter.value) {
                params.append("category", categoryFilter.value);
            }

            const response = await fetch(API_URL + "?" + params.toString());
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Unable to load blogs");
            }

            blogList.innerHTML = "";

            if (!data.blogs || data.blogs.length === 0) {
                blogList.textContent = "No blogs found.";
                return;
            }

            data.blogs.forEach(function (blog) {
                const card = document.createElement("div");
                card.className = "blog-card";

                const title = document.createElement("h3");
                title.textContent = blog.title;

                const content = document.createElement("p");
                content.textContent = blog.content;

                const author = document.createElement("p");
                author.textContent = "Author: " + blog.author;

                const category = document.createElement("p");
                category.textContent = "Category: " + (blog.category || "Other");

                const viewButton = document.createElement("button");
                viewButton.textContent = "View Details";
                viewButton.addEventListener("click", function () {
                    const id = blog._id || blog.id;
                    window.location.href = "blog-details.html?id=" + encodeURIComponent(id);
                });

                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.addEventListener("click", function () {
                    editBlog(blog);
                });

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.className = "delete-btn";
                deleteButton.addEventListener("click", function () {
                    deleteBlog(blog._id || blog.id);
                });

                card.append(title, content, author, category,
                    viewButton, editButton, deleteButton);

                blogList.appendChild(card);
            });

        } catch (error) {
            console.error(error);
            blogList.textContent = "Error: " + error.message;
        }
    }

    // CREATE BLOG
    blogForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const blogData = {
            title: document.getElementById("title").value.trim(),
            author: document.getElementById("author").value.trim(),
            content: document.getElementById("content").value.trim(),
            category: document.getElementById("category").value
        };

        if (!blogData.title || !blogData.author ||
            !blogData.content || !blogData.category) {
            message.textContent = "Please fill all fields!";
            return;
        }

        message.textContent = "Publishing blog...";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blogData)
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Blog creation failed");
            }

            message.textContent = "Blog created successfully!";
            blogForm.reset();
            await loadBlogs();

        } catch (error) {
            message.textContent = "Error: " + error.message;
        }
    });

    // EDIT BLOG
    async function editBlog(blog) {
        const title = prompt("Enter new title:", blog.title);
        if (title === null) return;

        const author = prompt("Enter author:", blog.author);
        if (author === null) return;

        const content = prompt("Enter content:", blog.content);
        if (content === null) return;

        const category = prompt(
            "Enter category: Technology, Education, Health, Lifestyle, Travel, Other",
            blog.category || "Other"
        );
        if (category === null) return;

        const allowed = [
            "Technology", "Education", "Health",
            "Lifestyle", "Travel", "Other"
        ];

        if (!title.trim() || !author.trim() || !content.trim() ||
            !allowed.includes(category.trim())) {
            alert("Please enter valid details and category!");
            return;
        }

        try {
            const response = await fetch(
                API_URL + "/" + (blog._id || blog.id),
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: title.trim(),
                        author: author.trim(),
                        content: content.trim(),
                        category: category.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Blog update failed");
            }

            message.textContent = "Blog updated successfully!";
            await loadBlogs();

        } catch (error) {
            message.textContent = "Error: " + error.message;
        }
    }

    // DELETE BLOG
    async function deleteBlog(id) {
        if (!id || !confirm("Are you sure you want to delete this blog?")) {
            return;
        }

        try {
            const response = await fetch(API_URL + "/" + id, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Delete failed");
            }

            message.textContent = "Blog deleted successfully!";
            await loadBlogs();

        } catch (error) {
            message.textContent = "Error: " + error.message;
        }
    }

    // SEARCH, FILTER AND REFRESH
    searchInput.addEventListener("input", loadBlogs);
    categoryFilter.addEventListener("change", loadBlogs);
    refreshBtn.addEventListener("click", loadBlogs);

    loadBlogs();
});
