import React, { useEffect, useState } from "react";
import { useParams, } from "react-router-dom";
import { getPostById, getImageUrl } from "../api";

export default function PostPage() {
  const { id } = useParams();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const found = await getPostById(id);
        setPost(found || null);
      } catch (err) {
        console.error("Error fetching post:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (!post) return <p className="text-center py-10 text-gray-400">Post not found</p>;

  const title = post.title || "Untitled";
  const content = Array.isArray(post.content)
    ? post.content
        .map((block) =>
          block.children ? block.children.map((child) => child.text).join("") : ""
        )
        .join("\n\n")
    : post.content || "No content available";

  const imageUrl = getImageUrl(post.image);

  return (
    <div className="max-w-3xl mt-20 px-4 py-6">
      

      <h1 className="text-2xl sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
        {title}
      </h1>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto max-h-96 object-cover rounded-md mb-6"
        />
      )}

      <div className="text-gray-700 whitespace-pre-line text-sm sm:text-sm md:text-base">
        {content}
      </div>

      <p className="text-xs text-gray-400 mt-6">
        📅 {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
