import React, { useState, useEffect } from "react";
import { fetchNews } from "../utils/api";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNews(page);
      setNews(data.articles);
      setTotalPages(data.totalPages);
    };

    getNews();
  }, [page]);

  return (
    <div>
      {news.map((article) => (
        <NewsCard
          key={article.url}
          title={article.title}
          description={article.description}
          imageUrl={article.imageUrl}
          url={article.url}
        />
      ))}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Home;
