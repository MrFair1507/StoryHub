import React, { useState, useEffect } from "react";
import Story from "../Story/Story";
import { fetchData } from "../../api"; // Đảm bảo rằng đường dẫn đúng
import "./MainContent.css";

function MainContent({ selectedGenre }) {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMangas = async () => {
      try {
        setLoading(true);
        // Tạo endpoint dựa trên genre được chọn
        const endpoint = selectedGenre
          ? `/api/Mangas/genre/${encodeURIComponent(selectedGenre)}`
          : "/api/Mangas";

        console.log("Fetching from:", endpoint);
        const result = await fetchData(endpoint);

        if (result?.Mangas) {
          setMangas(result.Mangas);
        } else {
          setError("Không có dữ liệu truyện");
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error?.message || "Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    getMangas();
  }, [selectedGenre]); // Chạy lại khi selectedGenre thay đổi

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
          mangas.map((manga) => <Story key={manga.mangaId} manga={manga} />)
        ) : (
          <div className="no-manga">Không có truyện nào</div>
        )}
      </div>
    </main>
  );
}

export default MainContent;
