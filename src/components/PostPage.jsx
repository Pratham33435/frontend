import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(
          `https://creative-backend-0u37.onrender.com/api/posts/${id}`
        );
        const data = await res.json();
        setPost(data || null);
      } catch (err) {
        console.error("Error fetching post:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (!post)
    return <p className="text-center py-10 text-gray-400">Post not found</p>;

  const title = post.title || "Untitled";
  const content = post.content || "No content available";

  return (
    <div className="max-w-3xl mt-20 px-4 py-6">
      <h1 className="text-2xl sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
        {title}
      </h1>

      {post.image && (
        <img
          src={post.image}
          alt={title}
          className="w-full h-auto max-h-96 object-cover rounded-md mb-6"
        />
      )}

      <div className="text-gray-700 whitespace-pre-line text-sm sm:text-sm md:text-base">
        {content}
      </div>

      {/* Social media links */}
      <div className="flex gap-4 mt-4">
        {post.instagram && (
          <a
            href={post.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            <FaInstagram />
          </a>
        )}
        {post.facebook && (
          <a
            href={post.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            <FaFacebookF />
          </a>
        )}
        {post.youtube && (
          <a
            href={post.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:underline"
          >
            <FaYoutube />
          </a>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-6">
        📅 {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
