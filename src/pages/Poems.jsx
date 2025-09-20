// src/pages/Poems.jsx
import PostList from "../components/Postlist";

export default function Poems() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-6">Poems</h1>
      <PostList category="poem" />
    </div>
  );
}
