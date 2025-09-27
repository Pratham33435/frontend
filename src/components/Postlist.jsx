import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PostList({ category }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let url = "https://creative-backend-0u37.onrender.com/api/posts";
        if (category) url += `?category=${category}`;
        const res = await fetch(url);
        const data = await res.json();
        setPosts(data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [category]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 text-lg">Loading...</p>
      </div>
    );

  if (!posts.length)
    return (
      <p className="text-center py-10 text-gray-400">
        No {category || "posts"} yet...
      </p>
    );

  return (
    <div className="max-w-5xl mt-20 px-4 py-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link to={`/post/${post._id}`} key={post._id}>
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 sm:h-40 md:h-48 lg:h-56 object-cover"
              />
            )}
            <div className="p-4 flex flex-col justify-between h-full">
              <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 whitespace-pre-line line-clamp-4 text-sm sm:text-sm md:text-base">
                {post.content || "No content available"}
              </p>
              <p className="text-xs text-gray-400 mt-3">
                📅 {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
