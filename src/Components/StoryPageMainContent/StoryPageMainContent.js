import React from "react";
import "./StoryPageMainContent.css";
import MangaContent from "../MangaContent/MangaContent";

function StoryPageMainContent() {
  const chapters = [
    {
      id: 1,
      mangaId: 1,
      chapter_name: "Welcome To Morioh",
      language: "EN",
      upload_date: "2024-12-09",
      folder: "Mangas/Jojolion/Chapter01",
      folderBia: "Mangas/Jojolion/Chapter01/Page 1.png",
    },
    {
      id: 2,
      mangaId: 2,
      chapter_name: "The End of The Adventure",
      language: "EN",
      upload_date: "2024-12-09",
      folder: "Mangas/SousouNoFrieren/Chapter01",
      folderBia: "Mangas/SousouNoFrieren/Chapter01/Page 1.png",
    },
    {
      id: 3,
      mangaId: 3,
      chapter_name: "The End of The Adventure",
      language: "EN",
      upload_date: "2024-12-09",
      folder: "Mangas/SousouNoFrieren/Chapter01",
      folderBia: "Mangas/SousouNoFrieren/Chapter01/Page 1.png",
    },
    {
      id: 4,
      mangaId: 4,
      chapter_name: "The End of The Adventure",
      language: "EN",
      upload_date: "2024-12-09",
      folder: "Mangas/SousouNoFrieren/Chapter01",
      folderBia: "Mangas/SousouNoFrieren/Chapter01/Page 1.png",
    },
    // Thêm các chapter khác...
  ];

  return (
    <main className="main-content">
      <h2 className="section-title">Danh sách Chapter</h2>
      <div className="chapters-grid">
        {chapters.map((chapter) => (
          <MangaContent
            key={chapter.id}
            chapter={{
              id: chapter.id,
              title: chapter.chapter_name,
              cover: chapter.folderBia,
              published: chapter.upload_date,
              description: `Chapter ${chapter.id} của truyện`,
            }}
          />
        ))}
      </div>
    </main>
  );
}

export default StoryPageMainContent;
