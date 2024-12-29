import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChapterUpload.css';

function ChapterUpload() {
  const { mangaId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mangaId) {
      alert('Không tìm thấy manga');
      navigate('/');
    }
  }, [mangaId, navigate]);

  const [formData, setFormData] = useState({
    chapterName: '',
    language: '',
    zipFile: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.zip')) {
        setError('Vui lòng chọn file ZIP');
        setFilePreview(null);
        return;
      }
      
      if (file.size > 100 * 1024 * 1024) {
        setError('File không được vượt quá 100MB');
        setFilePreview(null);
        return;
      }

      setFormData(prev => ({
        ...prev,
        zipFile: file
      }));
      setFilePreview(file.name);
      setError(null);
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.chapterName.trim()) {
      errors.push('Vui lòng nhập tên chapter');
    }
    if (!formData.language.trim()) {
      errors.push('Vui lòng nhập ngôn ngữ');
    }
    if (!formData.zipFile) {
      errors.push('Vui lòng chọn file ZIP');
    }
    if (errors.length > 0) {
      setError(errors.join('\n'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!mangaId) {
      setError('Không tìm thấy manga ID');
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    const uploadData = new FormData();
    uploadData.append('ChapterName', formData.chapterName);
    uploadData.append('Language', formData.language);
    uploadData.append('UploadDate', new Date().toISOString());
    
    if (formData.zipFile) {
      uploadData.append('zipFile', formData.zipFile);
    }

    // Log data trước khi gửi
    console.log('MangaId:', mangaId);
    console.log('Uploading to:', `http://localhost:5034/api/Mangas/UploadChapter/${mangaId}`);
    for (let pair of uploadData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.post(
        `http://localhost:5034/api/Mangas/UploadChapter/${mangaId}`,
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        }
      );

      if (response.data) {
        alert('Upload chapter thành công!');
        navigate(`/manga/${mangaId}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      let errorMessage = 'Có lỗi xảy ra khi upload chapter';
      
      if (err.response?.data) {
        if (typeof err.response.data === 'object') {
          if (err.response.data.title) {
            errorMessage = err.response.data.title;
          } else if (err.response.data.errors) {
            const errors = Object.values(err.response.data.errors).flat();
            errorMessage = errors.join(', ');
          }
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chapter-upload-container">
      <h2>Upload Chapter Mới {mangaId ? `cho Manga #${mangaId}` : ''}</h2>
      
      {error && (
        <div className="error-message">
          {typeof error === 'string' ? error : 'Có lỗi xảy ra khi upload chapter'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Tên Chapter:</label>
          <input
            type="text"
            name="chapterName"
            value={formData.chapterName}
            onChange={handleInputChange}
            placeholder="Nhập tên chapter"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label>Ngôn ngữ:</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            placeholder="Nhập ngôn ngữ"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label>File Chapter (ZIP):</label>
          <input
            type="file"
            accept=".zip"
            onChange={handleFileChange}
            className="file-input"
            disabled={loading}
          />
          {filePreview && (
            <div className="file-preview">
              File đã chọn: {filePreview}
            </div>
          )}
        </div>

        {loading && (
          <div className="upload-progress">
            <div 
              className="progress-bar"
              style={{ width: `${uploadProgress}%` }}
            />
            <span>{uploadProgress}%</span>
          </div>
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Đang upload...' : 'Upload Chapter'}
        </button>
        </form>
    </div>
  );
}

export default ChapterUpload;
