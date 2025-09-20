import React, { useEffect, useState } from "react";
import { getPosts, getImageUrl } from "../api";
import { Link } from "react-router-dom";

export default function PostList({ category }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPosts(category);
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
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  if (!posts.length)
    return (
      <p className="text-center py-10 text-gray-400">
        No {category || "posts"} yet...
      </p>
    );

  const extractText = (contentArray) => {
    if (!Array.isArray(contentArray)) return "";
    return contentArray
      .map((block) =>
        block.children ? block.children.map((child) => child.text).join("") : ""
      )
      .join("\n\n");
  };

  return (
    <div className="max-w-5xl mt-20 px-4 py-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((postItem) => {
        const title = postItem.title || "Untitled";
        const content = extractText(postItem.content) || "No content available";
        const imageUrl = getImageUrl(postItem.image);

        return (
          <Link to={`/post/${postItem.id}`} key={postItem.id}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 sm:h-40 md:h-48 lg:h-56 object-cover"
                />
              )}
              <div className="p-4 flex flex-col justify-between h-full">
                <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {title}
                </h2>
                <p className="text-gray-600 whitespace-pre-line line-clamp-4 text-sm sm:text-sm md:text-base">
                  {content}
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  📅 {new Date(postItem.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
