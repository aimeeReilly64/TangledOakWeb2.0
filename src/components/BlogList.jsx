// src/components/BlogList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/wordpress/wp-json/wp/v2/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Latest Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title.rendered}</h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
