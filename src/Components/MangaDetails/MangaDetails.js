import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MangaDetails.css';

function MangaDetails() {
  const [mangaData, setMangaData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5034/api/Mangas/Manga/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMangaData(data.manga);
        setChapters(data.chapters.$values);
      } catch (error) {
        console.error('Error fetching manga details:', error);
      }
    };

    fetchMangaDetails();
  }, [id]);

  if (!mangaData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="manga-details-container">
      <div className="manga-header">
        <div className="manga-cover">
          <img 
            src={`http://localhost:5034/${mangaData.folderBia}`}
            alt={mangaData.mangaName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.png";
            }}
          />
        </div>
        <div className="manga-info">
          <h1>{mangaData.mangaName}</h1>
          <div className="author">Author: {mangaData.authorName}</div>
          <div className="genres">
            {mangaData.genreName.$values?.length > 0 ? (
              mangaData.genreName.$values.map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))
            ) : (
              <span>No genres available</span>
            )}
          </div>
          <div className="description">{mangaData.mangaDescription}</div>
        </div>
      </div>
      <div className="manga-chapters">
        <h2>Chapters</h2>
        {chapters.length > 0 ? (
          <ul>
            {chapters.map((chapter) => (
              <li key={chapter.chapterId}>
                <Link
                  to={`/chapter/${chapter.chapterId}`}
                  className="chapter-link"
                >
                  <strong>{chapter.chapterName}</strong> - {chapter.language} (Uploaded on {new Date(chapter.uploadDate).toLocaleDateString()})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No chapters available for this manga.</p>
        )}
      </div>
    </div>
  );
}

export default MangaDetails;
