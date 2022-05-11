import React, { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handlePosts();
  }, []);
  const handlePosts = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        "http://127.0.0.1:5000"
      );
      setPosts(result.data);
    } catch (err) {
      setError(err.message || "Unexpected Error!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <div>
        <h1>Posts</h1>
        {loading && <p>Posts are loading!</p>}
        {error && <p>{error}</p>}
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>{post.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}