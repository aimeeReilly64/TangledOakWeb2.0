// src/pages/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";
import blogPosts from "../data/blogPosts";

const Blog = () => {
  return (
    <div className="context-box">
      <h1>Our Blog</h1>
      {blogPosts.map((post) => (
        <div key={post.id} className="soft-box" style={{ marginBottom: "1.5rem" }}>
          <h2>{post.title}</h2>
          <p><em>{new Date(post.date).toLocaleDateString()}</em></p>
          <p>{post.summary}</p>
          <Link to={`/blog/${post.id}`} className="button">Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default Blog;
