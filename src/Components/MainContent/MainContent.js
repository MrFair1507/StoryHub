import React, { useState, useEffect } from 'react';
import Story from '../Story/Story';
import { fetchData } from '../../api';
import './MainContent.css';

function MainContent() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMangas = async () => {
      try {
        setLoading(true);
        const result = await fetchData('/api/Mangas');
        console.log('API response:', result);
  
        // Kiểm tra và lấy mảng Mangas
        if (result?.Mangas?.length > 0) {
          setMangas(result.Mangas);
        } else {
          setError('Không có dữ liệu truyện');
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error?.message || 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
  
    getMangas();
  }, []);
  
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Có lỗi xảy ra: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="reload-button"
        >
          Tải lại
        </button>
      </div>
    );
  }

  return (
    <main className="main-content">
      <h2 className="section-title">Truyện Mới Cập Nhật</h2>
      <div className="stories-grid">
        {mangas.length > 0 ? (
          mangas.map((manga) => (
            <Story 
              key={manga.mangaId} 
              manga={manga}
            />
          ))
        ) : (
          <div className="no-manga">Không có truyện nào</div>
        )}
      </div>
    </main>
  );
}

export default MainContent;