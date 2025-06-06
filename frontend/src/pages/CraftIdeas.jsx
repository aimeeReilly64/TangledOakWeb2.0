import "../css/styles.css";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const CraftIdeas = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual WordPress site URL
    const WP_API_URL = "http://localhost:3000/frontend/src/pages/wordpress/";

    fetch(WP_API_URL)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching WordPress posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="context-box">
      <Helmet>
        <title>Craft Ideas | Tangled Oak</title>
        <meta name="description" content="Discover handmade and DIY craft ideas curated by The Tangled Oak + Craft Collective." />
      </Helmet>

      <h1>Craft Ideas</h1>

      {loading ? (
        <p>Loading craft ideas...</p>
      ) : posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <div className="blog-posts">
          {posts.map((post) => (
            <div key={post.id} className="blog-post">
              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              <a href={post.link} target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CraftIdeas;
