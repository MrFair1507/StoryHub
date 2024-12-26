import React from 'react'
import Story from '../Story/Story'
import './MainContent.css'



function MainContent() {
  const stories = [
    {
      id: 1,
      title: "Đường Về Phương Bắc",
      author: "Nguyễn Văn A", 
      cover: "/api/placeholder/200/300",
      description: "Một câu chuyện về hành trình khám phá vùng đất phương Bắc...",
      genres: ["Phiêu lưu", "Lãng mạn"]
    },
    {
      id: 2,
      title: "Giấc Mơ Sao Biển",
      author: "Trần Thị B",
      cover: "/api/placeholder/200/300", 
      description: "Câu chuyện về tình yêu và ước mơ nơi bờ biển...",
      genres: ["Lãng mạn", "Đời thường"]
    },
    {
      id: 3,
      title: "Thành Phố Về Đêm",
      author: "Lê Văn C",
      cover: "/api/placeholder/200/300",
      description: "Những câu chuyện bí ẩn trong thành phố về đêm...", 
      genres: ["Kinh dị", "Trinh thám"]
    },
    {
      id: 4,
      title: "Thành Phố Về Đêm",
      author: "Lê Văn C",
      cover: "/api/placeholder/200/300",
      description: "Những câu chuyện bí ẩn trong thành phố về đêm...", 
      genres: ["Kinh dị", "Trinh thám"]
    },
    {
      id: 5,
      title: "Thành Phố Về Đêm",
      author: "Lê Văn C",
      cover: "/api/placeholder/200/300",
      description: "Những câu chuyện bí ẩn trong thành phố về đêm...", 
      genres: ["Kinh dị", "Trinh thám"]
    },
    {
      id: 6,
      title: "Thành Phố Về Đêm",
      author: "Lê Văn C",
      cover: "/api/placeholder/200/300",
      description: "Những câu chuyện bí ẩn trong thành phố về đêm...", 
      genres: ["Kinh dị", "Trinh thám"]
    },
    {
      id: 7,
      title: "Thành Phố Về Đêm",
      author: "Lê Văn C",
      cover: "/api/placeholder/200/300",
      description: "Những câu chuyện bí ẩn trong thành phố về đêm...", 
      genres: ["Kinh dị", "Trinh thám"]
    },
    {
      id: 8,
      title: "Thành Phố Về Đêm",
      author: "Lê Văn C",
      cover: "/api/placeholder/200/300",
      description: "Những câu chuyện bí ẩn trong thành phố về đêm...", 
      genres: ["Kinh dị", "Trinh thám"]
    }
  ];
  return (
    <main className="main-content">
    <h2 className="section-title">Truyện Mới Cập Nhật</h2>
    <div className="stories-grid">
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </div>
  </main>
  )
}

export default MainContent;
