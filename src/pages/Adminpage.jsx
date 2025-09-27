import React, { useState, useEffect, useRef } from "react";

export default function AdminPage() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({
    title: "",
    category: "",
    imageFile: null,
    instagram: "",
    facebook: "",
    youtube: "",
  });

  const editorRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await fetch(
        "https://creative-backend-0u37.onrender.com/api/posts",
        { method: "GET", headers: { "Cache-Control": "no-cache" } }
      );
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
      else setPosts([]); // safeguard
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts after login
  useEffect(() => {
    if (isLoggedIn) fetchPosts();
  }, [isLoggedIn]);

  // Optional: auto-refresh every 60s
  useEffect(() => {
    const interval = setInterval(fetchPosts, 60000);
    return () => clearInterval(interval);
  }, []);

  // Admin login
  const handleLogin = () => {
    const adminPassword = "Localtales";
    if (password === adminPassword) setIsLoggedIn(true);
    else alert("Wrong password!");
  };

  const execCmd = (command, arg = null) => {
    document.execCommand(command, false, arg);
  };

  const getContent = () => {
    if (!editorRef.current) return "";
    return editorRef.current.innerHTML.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", getContent());
      formData.append("category", post.category);
      formData.append("instagram", post.instagram);
      formData.append("facebook", post.facebook);
      formData.append("youtube", post.youtube);
      if (post.imageFile) formData.append("image", post.imageFile);

      const res = await fetch(
        "https://creative-backend-0u37.onrender.com/api/posts",
        { method: "POST", body: formData }
      );

      if (res.ok) {
        alert("Post created!");
        setPost({
          title: "",
          category: "",
          imageFile: null,
          instagram: "",
          facebook: "",
          youtube: "",
        });
        editorRef.current.innerHTML = "";
        fetchPosts();
      } else {
        const data = await res.json();
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(
        `https://creative-backend-0u37.onrender.com/api/posts/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        alert("Post deleted!");
        setPosts(posts.filter((p) => p._id !== id));
      } else {
        const data = await res.json();
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  if (!isDesktop)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        ❌ Admin panel is only available on desktop.
      </h2>
    );

  if (!isLoggedIn)
    return (
      <div style={{ textAlign: "center", marginTop: "150px" }}>
        <h2>🔒 Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="cursor-pointer">
          Login
        </button>
      </div>
    );

  return (
    <div style={{ maxWidth: "900px", margin: "150px auto" }}>
      <h2>Create New Post</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#f9fafb",
              padding: "8px",
              borderBottom: "1px solid #ddd",
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <button type="button" onClick={() => execCmd("bold")}>
              <b>B</b>
            </button>
            <button type="button" onClick={() => execCmd("italic")}>
              <i>I</i>
            </button>
            <button type="button" onClick={() => execCmd("underline")}>
              <u>U</u>
            </button>
            <select
              onChange={(e) => execCmd("formatBlock", e.target.value)}
              defaultValue=""
            >
              <option value="">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
            </select>
            <button type="button" onClick={() => execCmd("insertUnorderedList")}>
              • List
            </button>
            <button type="button" onClick={() => execCmd("insertOrderedList")}>
              1. List
            </button>
            <button type="button" onClick={() => execCmd("justifyLeft")}>
              ⯇
            </button>
            <button type="button" onClick={() => execCmd("justifyCenter")}>
              ≡
            </button>
            <button type="button" onClick={() => execCmd("justifyRight")}>
              ⯈
            </button>
          </div>

          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            style={{
              minHeight: "300px",
              padding: "15px",
              fontSize: "16px",
              lineHeight: "1.6",
              outline: "none",
              fontFamily:
                "Kruti Dev 011, Noto Sans Devanagari, Mangal, Arial, sans-serif",
            }}
          ></div>
        </div>

        <select
          value={post.category}
          onChange={(e) => setPost({ ...post, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="poems">Poems</option>
          <option value="articles">Articles</option>
          <option value="stories">Stories</option>
          <option value="others">Others</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPost({ ...post, imageFile: e.target.files[0] })}
        />

        <input
          type="url"
          placeholder="Instagram URL (optional)"
          value={post.instagram}
          onChange={(e) => setPost({ ...post, instagram: e.target.value })}
        />
        <input
          type="url"
          placeholder="Facebook URL (optional)"
          value={post.facebook}
          onChange={(e) => setPost({ ...post, facebook: e.target.value })}
        />
        <input
          type="url"
          placeholder="YouTube URL (optional)"
          value={post.youtube}
          onChange={(e) => setPost({ ...post, youtube: e.target.value })}
        />

        <button type="submit">Save Post</button>
      </form>

      <h2 style={{ marginTop: "40px" }}>📑 Existing Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {posts.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                fontFamily: "Noto Sans Devanagari, Mangal, Arial, sans-serif",
              }}
            >
              <h3>{p.title}</h3>
              <div
                dangerouslySetInnerHTML={{ __html: p.content }}
                style={{ whiteSpace: "pre-wrap" }}
              />
              <p>
                <b>Category:</b> {p.category}
              </p>
              {p.image && (
                <img
                  src={p.image}
                  alt="post"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}

              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                {p.instagram && (
                  <a href={p.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                )}
                {p.facebook && (
                  <a href={p.facebook} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                )}
                {p.youtube && (
                  <a href={p.youtube} target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                )}
              </div>

              <button
                style={{
                  marginTop: "10px",
                  background: "red",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(p._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
