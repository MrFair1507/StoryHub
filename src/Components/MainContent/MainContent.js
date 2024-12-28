import React from 'react'
import Story from '../Story/Story'
import './MainContent.css'

function MainContent() {
  // Data mẫu dựa trên cấu trúc database
  const stories = [
    {
      mangaId: 1,
      author_name: "Hirohiko Araki",
      manga_name: "Jojolion",
      manga_description: "Manga JoJo part 8",
      folderBia: "FolderBia/Jojolion/Cover.png",
      genres: ["Action", "Mystery", "Seinen"] // Từ bảng Manga_Genre join với Genre
    },
    {
      mangaId: 2,
      author_name: "Yamada Kanehito, Abe Tsukasa",
      manga_name: "Sousou No Frieren",
      manga_description: "Click to select the whole column",
      folderBia: "FolderBia/SousouNoFrieren/Cover.png",
      genres: ["Shonen", "Fantasy", "Slice of life", "Monsters"]
    },
    {
      mangaId: 3,
      author_name: "Tatsuki Fujimoto",
      manga_name: "Chainsaw Man",
      manga_description: null,
      folderBia: "FolderBia/ChainsawMan/Cover.png",
      genres: ["Action", "Shonen", "Monsters"]
    },
    {
      mangaId: 4,
      author_name: "Tatsuki Fujimoto",
      manga_name: "Chainsaw Man",
      manga_description: null,
      folderBia: "FolderBia/ChainsawMan/Cover.png",
      genres: ["Action", "Shonen", "Monsters"]
    },
    {
      mangaId: 5,
      author_name: "Tatsuki Fujimoto",
      manga_name: "Chainsaw Man",
      manga_description: null,
      folderBia: "FolderBia/ChainsawMan/Cover.png",
      genres: ["Action", "Shonen", "Monsters"]
    },
    {
      mangaId: 6,
      author_name: "Tatsuki Fujimoto",
      manga_name: "Chainsaw Man",
      manga_description: null,
      folderBia: "FolderBia/ChainsawMan/Cover.png",
      genres: ["Action", "Shonen", "Monsters"]
    },
    {
      mangaId: 7,
      author_name: "Tatsuki Fujimoto",
      manga_name: "Chainsaw Man",
      manga_description: null,
      folderBia: "FolderBia/ChainsawMan/Cover.png",
      genres: ["Action", "Shonen", "Monsters"]
    },
    {
      mangaId: 8,
      author_name: "Tatsuki Fujimoto",
      manga_name: "Chainsaw Man",
      manga_description: null,
      folderBia: "FolderBia/ChainsawMan/Cover.png",
      genres: ["Action", "Shonen", "Monsters"]
    },
  ];

  return (
    <main className="main-content">
      <h2 className="section-title">Truyện Mới Cập Nhật</h2>
      <div className="stories-grid">
        {stories.map((story) => (
          <Story 
            key={story.mangaId} 
            story={{
              id: story.mangaId,
              title: story.manga_name,
              author: story.author_name,
              cover: story.folderBia,
              description: story.manga_description || "Chưa có mô tả",
              genres: story.genres
            }} 
          />
        ))}
      </div>
    </main>
  )
}

export default MainContent;