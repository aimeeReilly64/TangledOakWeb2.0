import React from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../data/BlogPosts";

const Post = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return (
      <div className="context-box">
        <h1>Post Not Found</h1>
        <Link to="/blog" className="button">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="context-box">
      <h1>{post.title}</h1>
      <p><em>{new Date(post.date).toLocaleDateString()}</em></p>
      <div style={{ whiteSpace: "pre-line" }}>{post.content}</div>
      <br />
      <Link to="/blog" className="button">← Back to Blog</Link>
    </div>
  );
};

export default Post;
