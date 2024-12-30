import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import './MangaDetails.css';
import DeleteChapter from '../DeleteChapter/DeleteChapter';

const MangaDetails = forwardRef(({ id }, ref) => { // Nhận id từ props
  const [mangaData, setMangaData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  const fetchMangaDetails = async () => {
    if (!id) return;

    try {
      setLoading(true);
      console.log("Fetching manga details for ID:", id); // Debug log
      const response = await fetch(`http://localhost:5034/api/Mangas/Manga/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched data:", data); // Debug log
      
      if (data && data.manga) {
        setMangaData(data.manga);
        setChapters(data.chapters.$values || []);
        setError(null);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching manga details:', error);
      setError('Không thể tải thông tin manga. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchMangaDetails
  }));

  useEffect(() => {
    if (id) {
      fetchMangaDetails();
    }
  }, [id]);

  const handleDeleteClick = (chapterId) => {
    setSelectedChapterId(chapterId);
    setShowDeleteModal(true);
  };

  const handleDeleteSuccess = () => {
    setShowDeleteModal(false);
    fetchMangaDetails();
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!mangaData) {
    return <div className="error-message">Không tìm thấy manga</div>;
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
          <div className="author">Tác giả: {mangaData.authorName}</div>
          <div className="genres">
            {mangaData.genreName.$values?.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
          <div className="description">{mangaData.mangaDescription}</div>
        </div>
      </div>

      <div className="manga-chapters">
        <h2>Danh sách Chapter</h2>
        {chapters.length > 0 ? (
          <ul>
            {chapters.map((chapter) => (
              <li key={chapter.chapterId} className="chapter-item">
                <Link
                  to={`/chapter/${chapter.chapterId}`}
                  className="chapter-link"
                >
                  <strong>{chapter.chapterName}</strong> - {chapter.language}
                  <span className="upload-date">
                    {new Date(chapter.uploadDate).toLocaleDateString('vi-VN')}
                  </span>
                </Link>
                <button 
                  onClick={() => handleDeleteClick(chapter.chapterId)}
                  className="delete-chapter-button"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có chapter nào.</p>
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
});

MangaDetails.displayName = 'MangaDetails';

export default MangaDetails;