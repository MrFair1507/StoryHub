import React from 'react'
import './StoryPageMainContent.css';
import MangaContent from '../MangaContent/MangaContent';

function StoryPageMainContent() {
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
        },
        {
          id: 6,
          title: "Chapter 66",
          author: "Nguyễn Văn A",
          translator: "Reset Scans",
          published: "12/24/2024",
        },
        {
          id: 7,
          title: "Chapter 66",
          author: "Nguyễn Văn A",
          translator: "Reset Scans",
          published: "12/24/2024",
        },
        {
          id: 8,
          title: "Chapter 66",
          author: "Nguyễn Văn A",
          translator: "Reset Scans",
          published: "12/24/2024",
        },
        {
          id: 9,
          title: "Chapter 66",
          author: "Nguyễn Văn A",
          translator: "Reset Scans",
          published: "12/24/2024",
        },
        {
          id: 10,
          title: "Chapter 66",
          author: "Nguyễn Văn A",
          translator: "Reset Scans",
          published: "12/24/2024",
        }
      ];
  return (
    <main className="main-content">
    <h2 className="section-title">Các tập truyện</h2>
    <div className="chapters-grid">
      {chapters.map((chapter) => (
        <MangaContent key={chapter.id} chapter={chapter} />
      ))}
    </div>
  </main>
  )
}

export default StoryPageMainContent
