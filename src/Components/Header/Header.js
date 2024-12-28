import React from "react";
import { Search, Menu, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  // Genres từ database
  const genres = [
    { genreId: 1, genre_name: "Action" },
    { genreId: 2, genre_name: "Mystery" },
    { genreId: 3, genre_name: "Seinen" },
    { genreId: 4, genre_name: "Dark Fantasy" },
    { genreId: 5, genre_name: "Shonen" },
    { genreId: 6, genre_name: "Fantasy" },
    { genreId: 7, genre_name: "Slice of life" },
    { genreId: 8, genre_name: "Monsters" }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>MangaHub</h1>
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
          <button className="genre-button">Tất cả</button>
          {genres.map((genre) => (
            <button key={genre.genreId} className="genre-button">
              {genre.genre_name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;