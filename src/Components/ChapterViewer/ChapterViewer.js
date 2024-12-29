import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ChapterViewer.css";

function ChapterViewer() {
  const { chapterId } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        console.log("Fetching chapter:", chapterId);
        const response = await fetch(
          `http://localhost:5034/api/Mangas/Chapter/${chapterId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch chapter data`);
        }
        const data = await response.json();
        console.log("Received data:", data);
        console.log("Pages directories:", data.pagesDirectories);
        setChapterData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    };

    if (chapterId) {
      fetchChapterData();
    }
  }, [chapterId]);

  return (
    <div className="chapter-viewer">
      <h2>Chapter Viewer</h2>
      {error ? (
        <div className="error">{error}</div>
      ) : chapterData?.pagesDirectories?.$values ? (
        <div className="chapter-images">
          {chapterData.pagesDirectories.$values.map((url, index) => (
            <img
              key={index}
              src={`http://localhost:5034/${url.replace("~/", "")}`}
              alt={`Page ${index + 1}`}
              className="chapter-image"
              onError={(e) => {
                console.log("Failed to load image:", url);
                e.target.onerror = null;
                e.target.src = "/placeholder.png";
              }}
            />
          ))}
        </div>
      ) : (
        <div className="loading">Loading chapter images...</div>
      )}
    </div>
  );
}

export default ChapterViewer;
