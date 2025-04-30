import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import blogPosts from "../data/BlogPosts"; 
import "../css/styles.css"; 

const Blog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "The Tangled Oak + Craft Collective Blog",
    "url": "https://tangledoak.ca/blog",
    "description": "A handmade marketplace blog featuring gift guides, maker stories, and seasonal inspiration.",
    "publisher": {
      "@type": "Organization",
      "name": "The Tangled Oak + Craft Collective"
    },
    "blogPost": blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "url": `https://tangledoak.ca/blog/${post.id}`,
      "description": post.summary,
      "author": {
        "@type": "Organization",
        "name": "The Tangled Oak + Craft Collective"
      }
    }))
  };

  return (
    <div className="context-box">
      <Helmet>
        <title>The Tangled Oak Blog | Craft Collective Stories</title>
        <meta 
          name="description" 
          content="Discover handmade gift guides, behind-the-scenes artisan stories, and seasonal inspiration on The Tangled Oak + Craft Collective blog." 
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

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

