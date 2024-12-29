import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ChapterUpload.css';

function ChapterUpload() {
  const { mangaId } = useParams();
  const navigate = useNavigate();
  const [chapterName, setChapterName] = useState('');
  const [language, setLanguage] = useState('');
  const [zipFile, setZipFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('zipFile', zipFile);
    formData.append('chapterName', chapterName);
    formData.append('language', language);
    formData.append('uploadDate', new Date().toISOString());

    try {
      const response = await fetch(`http://localhost:5034/api/Mangas/UploadChapter/${mangaId}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      navigate(`/story/${mangaId}`);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chapter-upload-container">
      <h2>Upload New Chapter</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Chapter Name:</label>
          <input
            type="text"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Language:</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Chapter Files (ZIP):</label>
          <input
            type="file"
            accept=".zip"
            onChange={(e) => setZipFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Chapter'}
        </button>
      </form>
    </div>
  );
}

export default ChapterUpload;
