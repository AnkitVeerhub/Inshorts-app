import React, { useState } from "react";
import "./NewsCard.css";

const NewsCard = ({ title, category, content, fullContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="news-card">
      <h2 className="news-title">{title}</h2>
      <p className="category">{category}</p>

      {/* Display truncated content by default and full content when expanded */}
      <p className={`news-content ${isExpanded ? "expanded" : "collapsed"}`}>
        {isExpanded ? content : `${content.substring(0, 50)}...`}
      </p>

      <button className="read-more-btn" onClick={toggleContent}>
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </div>
  );
};

export default NewsCard;
