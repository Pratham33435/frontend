import axios from "axios";

export const API_URL = "https://my-strapi-backend-5w3x.onrender.com";

// Get posts by category
export async function getPosts(category) {
  let url = `${API_URL}/api/posts?populate=*`; // 👈 important
  if (category) {
    url += `&filters[category][$eq]=${category}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  return data.data;
}

export async function getPostById(id) {
  const res = await fetch(`${API_URL}/api/posts?populate=*`);
  const data = await res.json();
  return data.data.find((p) => p.id === parseInt(id));
}


// api.js
export async function getPoems() {
  const res = await fetch(`${API_URL}/api/poems`);
  return (await res.json()).data;
}

export async function getArticles() {
  const res = await fetch(`${API_URL}/api/articles`);
  return (await res.json()).data;
}

export async function getStories() {
  const res = await fetch(`${API_URL}/api/stories`);
  return (await res.json()).data;
}

export async function getOthers() {
  const res = await fetch(`${API_URL}/api/others`);
  return (await res.json()).data;
}
export function getImageUrl(image) {
  if (!image || !image.url) return null;
  return image.url.startsWith("http") ? image.url : `${API_URL}${image.url}`;
}
