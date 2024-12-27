import React from 'react';
import './MangaContent.css';

function MangaContent({chapter}) {
  return (
    

      <div className="chapter-card">
        <img 
          src={chapter.cover || '/images/default-manga-cover.jpg'} 
          alt={chapter.title} 
          className="chapter-cover" 
        />
        <div className="chapter-info">
          <h3 className="chapter-title">{chapter.title}</h3>
          <p className="chapter-author">Tác giả: {chapter.author}</p>
          <p className="chapter-translator">Nhóm dịch: {chapter.translator}</p>
          <p className="chapter-date">Ngày đăng: {chapter.published}</p>
          {chapter.genres && (
            <div className="chapter-genres">
              {chapter.genres.map(genre => (
                <span key={genre} className="genre-tag">{genre}</span>
              ))}
            </div>
          )}
        </div>
        <div className="chapter-overlay">
          <button className="read-button">Đọc Ngay</button>
          <p className="chapter-description">{chapter.description || 'Chưa có mô tả'}</p>
        </div>
      </div>
    
  );
}

export default MangaContent;