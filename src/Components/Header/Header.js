import React, { useState, useEffect } from "react";
import { Search, Menu, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";

const Header = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Giữ nguyên phần fetch genres
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
          setFilteredGenres(formattedGenres); // Khởi tạo filteredGenres
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

    if (value) {
      const filtered = genres.filter((genre) =>
        genre.GenreName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGenres(filtered);
      setShowDropdown(true);
    } else {
      setFilteredGenres(genres);
      setShowDropdown(false);
    }
  };

  const handleGenreClick = (genreName) => {
    setActiveGenre(genreName);
    onGenreSelect(genreName);
    setSearchTerm("");
    setShowDropdown(false);
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
                placeholder="Tìm kiếm thể loại..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setShowDropdown(true)}
              />
              <Search className="search-icon" size={20} />
            </div>

            {showDropdown && searchTerm && (
              <div className="search-dropdown">
                {filteredGenres.length > 0 ? (
                  filteredGenres.map((genre) => (
                    <div
                      key={genre.GenreId}
                      className="search-item"
                      onClick={() => handleGenreClick(genre.GenreName)}
                    >
                      {genre.GenreName}
                    </div>
                  ))
                ) : (
                  <div className="search-item no-results">
                    Không tìm thấy thể loại
                  </div>
                )}
              </div>
            )}
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
