// src/pages/Articles.jsx
import PostList from "../components/Postlist";

export default function Articles() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-6">Articles</h1>
      <PostList category="article" />
    </div>
  );
}
