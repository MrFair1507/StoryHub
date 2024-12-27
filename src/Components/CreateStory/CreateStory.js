import React, { useState } from 'react';
import './CreateStory.css';

function CreateStory() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    cover: null,
    genres: []
  });

  const availableGenres = [
    "Phiêu lưu",
    "Lãng mạn",
    "Kinh dị",
    "Trinh thám",
    "Đời thường"
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

  const handleGenreChange = (genre) => {
    setFormData({
      ...formData,
      genres: formData.genres.includes(genre)
        ? formData.genres.filter(g => g !== genre)
        : [...formData.genres, genre]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // API call here
  };

  return (
    <div className="create-story-container">
      <h2>Tạo Truyện Mới</h2>
      <form onSubmit={handleSubmit} className="create-story-form">
        <div className="form-group">
          <label>Tiêu đề</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Tác giả</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
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
              <label key={genre} className="genre-checkbox">
                <input
                  type="checkbox"
                  checked={formData.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
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