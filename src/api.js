const API_BASE = "https://creative-backend-0u37.onrender.com/api/posts";

// Fetch posts (optionally by category)
export const getPosts = async (category) => {
  let url = API_BASE;
  if (category) url += `?category=${encodeURIComponent(category)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
};

// Fetch single post by ID
export const getPostById = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return await res.json();
};

// Create new post (with image upload)
export const createPost = async (postData) => {
  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  formData.append("category", postData.category);
  if (postData.instagram) formData.append("instagram", postData.instagram);
  if (postData.facebook) formData.append("facebook", postData.facebook);
  if (postData.youtube) formData.append("youtube", postData.youtube);
  if (postData.imageFile) formData.append("image", postData.imageFile);

  const res = await fetch(API_BASE, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create post");
  }
  return await res.json();
};

// Delete a post by ID
export const deletePost = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to delete post");
  }
  return await res.json();
};
