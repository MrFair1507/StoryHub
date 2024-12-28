import React from "react";
import "./Story.css";
import { Link } from "react-router-dom";

function Story({ manga }) {
  // Log để debug dữ liệu genres
  console.log("Genre data:", manga.genreName);

  // Kiểm tra nếu genreName là một object có $values
  const genres = manga.genreName?.$values || manga.genreName || [];

  return (
    <Link
      to={`/manga/${manga.MangaId}`}
      className="story-card"
      style={{ textDecoration: "none" }}
    >
      <img
        src={`http://localhost:5034/${manga.folderBia}`}
        alt={manga.MangaName}
        className="story-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.png";
        }}
      />

      <div className="story-info">
        <h3 className="story-title">{manga.MangaName}</h3>
        <p className="story-author">{manga.authorName}</p>

        <div className="story-genres">
          {Array.isArray(genres) && genres.length > 0 ? (
            genres.map((genre, index) => (
              <span key={index} className="genre-tag">
                {genre}
              </span>
            ))
          ) : (
            <span className="genre-tag">Chưa phân loại</span>
          )}
        </div>
      </div>

      <div className="story-overlay">
        <button className="read-button">Đọc Ngay</button>
        <p className="story-description">
          {manga.MangaDescription || "Chưa có mô tả"}
        </p>
      </div>
    </Link>
  );
}

export default Story;