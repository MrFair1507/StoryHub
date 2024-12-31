import React, { useState, useEffect } from "react";
import { Search, Menu, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";

const Header = ({ onGenreSelect, onSearch }) => {
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:5034/api/Mangas");

        if (response.data?.genres?.$values) {
          const genresData = response.data.genres.$values;
          const formattedGenres = genresData.map((genre) => ({
            GenreId: genre.genreId,
            GenreName: genre.genreName,
          }));
          setGenres(formattedGenres);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Gửi giá trị search lên component cha
  };

  const handleGenreClick = (genreName) => {
    setActiveGenre(genreName);
    onGenreSelect(genreName);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="logo">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <h1 className="logo-text">MangaHub</h1>
            </Link>
          </div>

          <div className="search-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm manga..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="search-icon" size={20} />
            </div>
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
          <button
            className={`genre-button ${activeGenre === null ? "active" : ""}`}
            onClick={() => handleGenreClick(null)}
          >
            Tất cả
          </button>
          {genres.map((genre) => (
            <button
              key={genre.GenreId}
              className={`genre-button ${
                activeGenre === genre.GenreName ? "active" : ""
              }`}
              onClick={() => handleGenreClick(genre.GenreName)}
            >
              {genre.GenreName}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
