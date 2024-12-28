import React, { useState } from 'react';
import './CreateStory.css';

function CreateStory() {
  const [formData, setFormData] = useState({
    manga_name: '',
    author_name: '',
    manga_description: '',
    cover: null,
    genreIds: [] // Sử dụng ID thay vì tên genre
  });

  // Genres từ database
  const availableGenres = [
    { genreId: 1, genre_name: "Action" },
    { genreId: 2, genre_name: "Mystery" },
    { genreId: 3, genre_name: "Seinen" },
    { genreId: 4, genre_name: "Dark Fantasy" },
    { genreId: 5, genre_name: "Shonen" },
    { genreId: 6, genre_name: "Fantasy" },
    { genreId: 7, genre_name: "Slice of life" },
    { genreId: 8, genre_name: "Monsters" }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cover: e.target.files[0]
    });
  };

  const handleGenreChange = (genreId) => {
    setFormData({
      ...formData,
      genreIds: formData.genreIds.includes(genreId)
        ? formData.genreIds.filter(id => id !== genreId)
        : [...formData.genreIds, genreId]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // API call to save manga and manga_genre relationships
  };

  return (
    <div className="create-story-container">
      <h2>Tạo Truyện Mới</h2>
      <form onSubmit={handleSubmit} className="create-story-form">
        <div className="form-group">
          <label>Tên Truyện</label>
          <input
            type="text"
            name="manga_name"
            value={formData.manga_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Tác giả</label>
          <input
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            name="manga_description"
            value={formData.manga_description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ảnh bìa</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Thể loại</label>
          <div className="genres-grid">
            {availableGenres.map(genre => (
              <label key={genre.genreId} className="genre-checkbox">
                <input
                  type="checkbox"
                  checked={formData.genreIds.includes(genre.genreId)}
                  onChange={() => handleGenreChange(genre.genreId)}
                />
                {genre.genre_name}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Tạo Truyện
        </button>
      </form>
    </div>
  );
}

export default CreateStory;