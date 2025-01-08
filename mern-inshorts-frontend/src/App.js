import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsCard from "./components/NewsCard";
import "./App.css";
import axios from "axios";

const App = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch news from the backend when the component mounts
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/news")
      // Fetch data from backend
      .then((response) => {
        // Store all the news
        setNews(response.data);
        // Initially show all news
        setFilteredNews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  // Handle search query change
  const handleSearch = (query) => {
    if (query) {
      const filtered = news.filter(
        (item) => item.category.toLowerCase().includes(query.toLowerCase())
        // item.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(filtered);
    } else {
      setFilteredNews(news); // If search is cleared, show all news
    }
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <div className="news-container">
        {loading ? (
          <p>Loading news...</p>
        ) : filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <NewsCard
              key={item._id}
              title={item.title}
              category={item.category}
              content={item.content}
              fullContent={item.fullContent}
            />
          ))
        ) : (
          <p>No news found.</p> // Message when no news matches the search
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
