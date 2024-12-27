import React from "react";
import { Search, Menu, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";
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
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1>StoryHub</h1>
            </Link>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm truyện..." />
            <Search className="search-icon" size={20} />
          </div>

          <div className="nav-icons">
            <Link to="/create-story" className="create-button">
              <Plus size={20} />
              <span>Create</span>
            </Link>
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
