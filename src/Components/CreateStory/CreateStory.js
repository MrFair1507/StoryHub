import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateStory.css";

function CreateStory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    MangaName: "",
    AuthorName: "",
    MangaDescription: "",
    cover: null,
    genreIds: [],
  });

  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:5034/api/Mangas");
        if (response.data?.genres?.$values) {
          const genresData = response.data.genres.$values;
          setGenres(genresData);
        }
      } catch (error) {
        console.error("Error:", error);
        setErrors({ api: "Không thể tải danh sách thể loại" });
      }
    };
    fetchGenres();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          cover: "Vui lòng chọn file ảnh hợp lệ",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        cover: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.cover) {
        setErrors((prev) => ({ ...prev, cover: null }));
      }
    }
  };

  const handleGenreChange = (genreId) => {
    setFormData((prev) => ({
      ...prev,
      genreIds: prev.genreIds.includes(genreId)
        ? prev.genreIds.filter((id) => id !== genreId)
        : [...prev.genreIds, genreId],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.MangaName.trim())
      newErrors.MangaName = "Vui lòng nhập tên truyện";
    if (!formData.AuthorName.trim())
      newErrors.AuthorName = "Vui lòng nhập tên tác giả";
    if (!formData.MangaDescription.trim())
      newErrors.MangaDescription = "Vui lòng nhập mô tả";
    if (!formData.cover) newErrors.cover = "Vui lòng chọn ảnh bìa";
    if (formData.genreIds.length === 0)
      newErrors.genres = "Vui lòng chọn ít nhất một thể loại";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const formDataToSend = new FormData();

    try {
      const response = await axios.get("http://localhost:5034/api/Mangas");
      const mangas = response.data?.mangas?.$values || [];
      const maxMangaId = Math.max(...mangas.map((m) => m.mangaId), -1);
      const newMangaId = maxMangaId + 1;

      // Add basic manga information
      formDataToSend.append("MangaId", newMangaId.toString());
      formDataToSend.append("MangaName", formData.MangaName);
      formDataToSend.append("AuthorName", formData.AuthorName);
      formDataToSend.append("MangaDescription", formData.MangaDescription);

      // Add genres with both Id and Name
      const selectedGenres = genres.filter((genre) =>
        formData.genreIds.includes(genre.genreId)
      );

      selectedGenres.forEach((genre, index) => {
        formDataToSend.append(`Genres[${index}].GenreId`, genre.genreId);
        formDataToSend.append(`Genres[${index}].GenreName`, genre.genreName);
      });

      // Add cover image
      if (formData.cover) {
        formDataToSend.append("pngFile", formData.cover);
      }

      // Log form data for debugging
      console.log("Form data being sent:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      const createResponse = await axios.post(
        "http://localhost:5034/api/Mangas",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (createResponse.data) {
        alert("Tạo truyện thành công!");
        navigate("/");
      }
    } catch (error) {
      console.log(
        "Full error response:",
        JSON.stringify(error.response?.data, null, 2)
      );

      let errorMessage = "Có lỗi xảy ra khi tạo truyện";

      if (error.response?.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data.title) {
          errorMessage = error.response.data.title;
        } else if (error.response.data.errors) {
          // Handle nested error messages
          const errorMessages = [];
          for (const key in error.response.data.errors) {
            const messages = error.response.data.errors[key];
            if (Array.isArray(messages)) {
              errorMessages.push(...messages);
            }
          }
          errorMessage = errorMessages.join(", ");
        }
      }

      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-story-container">
      <h2
        style={{ marginBottom: "24px", color: "#1a202c", textAlign: "center" }}
      >
        Tạo Truyện Mới
      </h2>

      <form onSubmit={handleSubmit} className="create-story-form">
        <div className="form-group">
          <label>Tên Truyện *</label>
          <input
            type="text"
            name="MangaName"
            value={formData.MangaName}
            onChange={handleInputChange}
            placeholder="Nhập tên truyện"
          />
          {errors.MangaName && (
            <span className="error-text">{errors.MangaName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Tác Giả *</label>
          <input
            type="text"
            name="AuthorName"
            value={formData.AuthorName}
            onChange={handleInputChange}
            placeholder="Nhập tên tác giả"
          />
          {errors.AuthorName && (
            <span className="error-text">{errors.AuthorName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Mô Tả *</label>
          <textarea
            name="MangaDescription"
            value={formData.MangaDescription}
            onChange={handleInputChange}
            placeholder="Nhập mô tả truyện"
          />
          {errors.MangaDescription && (
            <span className="error-text">{errors.MangaDescription}</span>
          )}
        </div>

        <div className="form-group">
          <label>Ảnh Bìa *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {coverPreview && (
            <div className="cover-preview">
              <img src={coverPreview} alt="Preview" />
            </div>
          )}
          {errors.cover && <span className="error-text">{errors.cover}</span>}
        </div>

        <div className="form-group">
          <label>Thể Loại *</label>
          <div className="genres-grid">
            {genres.map((genre) => (
              <label key={genre.genreId} className="genre-checkbox">
                <input
                  type="checkbox"
                  checked={formData.genreIds.includes(genre.genreId)}
                  onChange={() => handleGenreChange(genre.genreId)}
                />
                <span>{genre.genreName}</span>
              </label>
            ))}
          </div>
          {errors.genres && <span className="error-text">{errors.genres}</span>}
        </div>

        {errors.submit && typeof errors.submit === "string" && (
          <div
            className="error-message"
            style={{ marginBottom: "20px", color: "red" }}
          >
            {errors.submit}
          </div>
        )}

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Tạo Truyện"}
        </button>
      </form>
    </div>
  );
}

export default CreateStory;
