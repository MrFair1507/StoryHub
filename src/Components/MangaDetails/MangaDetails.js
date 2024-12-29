import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MangaDetails.css';
import DeleteChapter from '../DeleteChapter/DeleteChapter';

function MangaDetails() {
  const [mangaData, setMangaData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  useEffect(() => {
    fetchMangaDetails();
  }, [id]);

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

  const handleDeleteClick = (chapterId) => {
    setSelectedChapterId(chapterId);
    setShowDeleteModal(true);
  };

  const handleDeleteSuccess = () => {
    setShowDeleteModal(false);
    fetchMangaDetails(); // Refresh the chapters list
  };

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
        <div className="chapters-header">
          <h2>Chapters</h2>
          <Link to={`/story/${id}/upload-chapter`} className="add-chapter-button">
            Add New Chapter
          </Link>
        </div>
        {chapters.length > 0 ? (
          <ul>
            {chapters.map((chapter) => (
              <li key={chapter.chapterId} className="chapter-item">
                <Link
                  to={`/chapter/${chapter.chapterId}`}
                  className="chapter-link"
                >
                  <strong>{chapter.chapterName}</strong> - {chapter.language} 
                  (Uploaded on {new Date(chapter.uploadDate).toLocaleDateString()})
                </Link>
                <button 
                  onClick={() => handleDeleteClick(chapter.chapterId)}
                  className="delete-chapter-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No chapters available for this manga.</p>
        )}
      </div>

      {showDeleteModal && (
        <DeleteChapter
          chapterId={selectedChapterId}
          onDelete={handleDeleteSuccess}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default MangaDetails;
