import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MangaDetails from "../MangaDetails/MangaDetails";
import ChapterUpload from "../ChapterUpload/ChapterUpload";
import './StoryPage.css';

function StoryPage() {
  const { id } = useParams();
  const [showUpload, setShowUpload] = useState(false);
  const mangaDetailsRef = useRef();

  if (!id) {
    return <div className="error-message">Không tìm thấy manga</div>;
  }

  const handleUploadSuccess = () => {
    setShowUpload(false);
    if (mangaDetailsRef.current?.fetchMangaDetails) {
      mangaDetailsRef.current.fetchMangaDetails();
    }
  };

  return (
    <div className="story-page">
      <MangaDetails 
        ref={mangaDetailsRef}
        id={id} // Truyền id xuống MangaDetails
      />
      <button 
        className="toggle-upload-button"
        onClick={() => setShowUpload(!showUpload)}
      >
        {showUpload ? 'Ẩn form upload' : 'Upload Chapter Mới'}
      </button>
      {showUpload && (
        <ChapterUpload 
          mangaId={id}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}

export default StoryPage;