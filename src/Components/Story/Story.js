import React from "react";
import "./Story.css";
import { Link } from "react-router-dom";

function Story({ manga }) {
  console.log("Manga data:", manga); 
  const genres = manga.genreName?.$values || manga.genreName || [];

  return (
    <Link
      to={`/story/${manga.mangaId}`} // Đổi MangaID thành mangaId để khớp với API
      className="story-card"
      style={{ textDecoration: "none" }}
    >
      <img
        src={`http://localhost:5034/${manga.folderBia}`}
        alt={manga.mangaName} // Đổi MangaName thành mangaName
        className="story-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder.png";
        }}
      />

      <div className="story-info">
        <h3 className="story-title">{manga.mangaName}</h3>
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
          {manga.mangaDescription || "Chưa có mô tả"} {/* Đổi MangaDescription thành mangaDescription */}
        </p>
      </div>
    </Link>
  );
}

export default Story;