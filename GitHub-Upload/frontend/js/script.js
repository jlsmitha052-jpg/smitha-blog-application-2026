
const API_URL = "/api/blogs";

document.addEventListener("DOMContentLoaded", function () {
    const blogForm = document.getElementById("blogForm");
    const blogList = document.getElementById("blogList");
    const message = document.getElementById("message");
    const refreshBtn = document.getElementById("refreshBtn");

    // LOAD ALL BLOGS
    async function loadBlogs() {
        blogList.textContent = "Loading blogs...";

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Unable to load blogs");
            }

            blogList.innerHTML = "";

            if (!data.blogs || data.blogs.length === 0) {
                blogList.textContent = "No blogs available.";
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

                // VIEW DETAILS BUTTON
                const viewButton = document.createElement("button");
                viewButton.textContent = "View Details";
                viewButton.className = "view-btn";

                viewButton.addEventListener("click", function () {
                    const blogId = blog._id || blog.id;

                    window.location.href =
                        "blog-details.html?id=" +
                        encodeURIComponent(blogId);
                });

                // EDIT BUTTON
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.className = "edit-btn";

                editButton.addEventListener("click", function () {
                    editBlog(blog);
                });

                // DELETE BUTTON
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.className = "delete-btn";

                deleteButton.addEventListener("click", function () {
                    deleteBlog(blog._id || blog.id);
                });

                card.appendChild(title);
                card.appendChild(content);
                card.appendChild(author);
                card.appendChild(viewButton);
                card.appendChild(editButton);
                card.appendChild(deleteButton);

                blogList.appendChild(card);
            });

        } catch (error) {
            console.error("Load error:", error);
            blogList.textContent = "Error: " + error.message;
        }
    }

    // CREATE BLOG
    blogForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const blogData = {
            title: document.getElementById("title").value.trim(),
            author: document.getElementById("author").value.trim(),
            content: document.getElementById("content").value.trim()
        };

        if (!blogData.title || !blogData.author || !blogData.content) {
            message.textContent = "Please fill all fields.";
            message.style.color = "red";
            return;
        }

        message.textContent = "Publishing blog...";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(blogData)
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Blog creation failed");
            }

            message.textContent = "Blog created successfully!";
            message.style.color = "green";

            blogForm.reset();
            await loadBlogs();

        } catch (error) {
            message.textContent = "Error: " + error.message;
            message.style.color = "red";
        }
    });

    // EDIT BLOG
    async function editBlog(blog) {
        const newTitle = prompt("Enter new blog title:", blog.title);
        if (newTitle === null) return;

        const newAuthor = prompt("Enter author name:", blog.author);
        if (newAuthor === null) return;

        const newContent = prompt("Enter new blog content:", blog.content);
        if (newContent === null) return;

        if (!newTitle.trim() || !newAuthor.trim() || !newContent.trim()) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await fetch(
                API_URL + "/" + (blog._id || blog.id),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: newTitle.trim(),
                        author: newAuthor.trim(),
                        content: newContent.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Blog update failed");
            }

            message.textContent = "Blog updated successfully!";
            message.style.color = "green";

            await loadBlogs();

        } catch (error) {
            message.textContent = "Error: " + error.message;
            message.style.color = "red";
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
            message.style.color = "green";

            await loadBlogs();

        } catch (error) {
            message.textContent = "Error: " + error.message;
            message.style.color = "red";
        }
    }

    // REFRESH BLOGS
    refreshBtn.addEventListener("click", loadBlogs);

    // LOAD BLOGS WHEN PAGE OPENS
    loadBlogs();
});
