import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../data/BlogPosts";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "../css/styles.css";

const Post = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) return <div className="blog-container">Post not found.</div>;

  return (
    <div className="blog-container">
      <h1 className="blog-title">{post.title}</h1>
      <p className="blog-date">{new Date(post.date).toLocaleDateString()}</p>
      <div className="blog-content">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      <Link to="/blog" className="back-button">← Back to Blog</Link>
    </div>
  );
};

export default Post;