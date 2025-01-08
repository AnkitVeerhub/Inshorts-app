import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams(); // Get the news ID from the URL
  const [news, setNews] = useState(null);

  useEffect(() => {
    // Fetch the detailed news using the ID
    fetch(`/api/news/${id}`)
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, [id]);

  if (!news) return <div>Loading...</div>;

  return (
    <div className="news-detail">
      <h2>{news.title}</h2>
      <p>
        <strong>Category: </strong>
        {news.category}
      </p>
      <p>{news.fullContent}</p>
    </div>
  );
};

export default NewsDetail;
