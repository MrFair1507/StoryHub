import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChapterUpload.css";
import { format } from "date-fns";

function ChapterUpload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    chapterName: "",
    language: "",
    zipFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith(".zip")) {
        setError("Please upload a valid ZIP file");
        return;
      }
      console.log("Selected file:", file); // Debug log
      setFormData((prev) => ({
        ...prev,
        zipFile: file,
      }));
      setFilePreview(file.name);
      setError(null);
    }
  };

  const validateForm = () => {
    const validations = {
      chapterName: {
        isValid: formData.chapterName.trim().length > 0,
        message: "Chapter name is required",
      },
      language: {
        isValid: formData.language.trim().length > 0,
        message: "Language is required",
      },
      zipFile: {
        isValid:
          formData.zipFile &&
          formData.zipFile.name.toLowerCase().endsWith(".zip"),
        message: "Please upload a valid ZIP file",
      },
    };

    const failedValidations = Object.entries(validations)
      .filter(([_, check]) => !check.isValid)
      .map(([_, check]) => check.message);

    if (failedValidations.length > 0) {
      setError(failedValidations.join(", "));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      setError("Manga ID is missing");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    const uploadData = new FormData();
    uploadData.append("zipFile", formData.zipFile);
    uploadData.append("chapterUploadDTO.ChapterName", formData.chapterName);
    uploadData.append("chapterUploadDTO.Language", formData.language);

    // Format the date in MM/DD/YYYY format
    const formattedDate = format(new Date(), "MM/dd/yyyy");
    uploadData.append("chapterUploadDTO.UploadDate", formattedDate);

    try {
      const response = await axios.post(
        `http://localhost:5034/api/Mangas/UploadChapter/${id}`,
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Upload successful!");
      }
      navigate(`/story/${id}`);
    } catch (err) {
      console.log("Error Response:", err.response?.data);
      setError("Upload failed. Please check file and data format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chapter-upload-container">
      <h2>Upload New Chapter</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Chapter Name:</label>
          <input
            type="text"
            name="chapterName"
            value={formData.chapterName}
            onChange={handleInputChange}
            placeholder="Enter chapter name"
            required
          />
        </div>

        <div className="form-group">
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            placeholder="Enter language"
            required
          />
        </div>

        <div className="form-group">
          <label>Chapter Files (ZIP):</label>
          <input
            type="file"
            accept=".zip"
            onChange={handleFileChange}
            className="file-input"
          />
          {filePreview && (
            <div className="file-preview">Selected file: {filePreview}</div>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Uploading..." : "Upload Chapter"}
        </button>
      </form>
    </div>
  );
}

export default ChapterUpload;
