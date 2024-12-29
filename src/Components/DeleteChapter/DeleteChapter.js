import React, { useState } from 'react';
import axios from 'axios';
import './DeleteChapter.css';

function DeleteChapter({ chapterId, onDelete, onCancel }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:5034/api/Mangas/XoaChapter/${chapterId}`);
      onDelete();
    } catch (error) {
      setError('Failed to delete chapter');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-chapter-modal">
      <div className="delete-chapter-content">
        <h3>Delete Chapter</h3>
        <p>Are you sure you want to delete this chapter?</p>
        {error && <div className="error-message">{error}</div>}
        <div className="button-group">
          <button 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="delete-button"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button 
            onClick={onCancel}
            disabled={isDeleting}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteChapter;
