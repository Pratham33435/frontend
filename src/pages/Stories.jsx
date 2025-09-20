// src/pages/Stories.jsx
import PostList from "../components/Postlist";

export default function Stories() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-6">Stories</h1>
      <PostList category="story" />
    </div>
  );
}
