import React from 'react'
import './MangaContent.css';

function MangaContent() {
  const chapters = [
    {
      id: 1,
      title: "Chapter 1",
      author: "Nguyễn Văn A",
      translator: "Reset Scans",
      published: "12/24/2024",
    },
    {
      id: 2,
      title: "Chapter 2", 
      author: "Nguyễn Văn A",
      translator: "Reset Scans",
      published: "12/24/2024",
    },
    {
      id: 3,
      title: "Chapter 3",
      author: "Nguyễn Văn A", 
      translator: "Reset Scans",
      published: "12/24/2024",
    },
    {
      id: 4,
      title: "Chapter 4",
      author: "Nguyễn Văn A",
      translator: "Reset Scans", 
      published: "12/24/2024",
    },
    {
      id: 5,
      title: "Chapter 5",
      author: "Nguyễn Văn A",
      translator: "Reset Scans",
      published: "12/24/2024",
    }
  ];

  return (
    <main className="main-content">
      <h2 className="chapter-title">Chapter</h2>
      <div className="chapters-grid">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="chapter-card">
            <h3>{chapter.title}</h3>
            <p>{chapter.author}</p>
            <p>{chapter.translator}</p>
            <p>{chapter.published}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MangaContent;
