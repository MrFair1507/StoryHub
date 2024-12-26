import React from "react";
import { Search, Menu, User } from "lucide-react";
import "./Header.css";

const Header = () => {
  const genres = [
    "Tất cả",
    "Phiêu lưu",
    "Lãng mạn",
    "Kinh dị",
    "Trinh thám",
    "Đời thường",
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo">
            <h1>StoryHub</h1>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm truyện..." />
            <Search className="search-icon" size={20} />
          </div>

          <div className="nav-icons">
            <Menu className="icon" size={24} />
            <User className="icon" size={24} />
          </div>
        </div>

        <nav className="genre-nav">
          {genres.map((genre) => (
            <button key={genre} className="genre-button">
              {genre}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
export default Header;
