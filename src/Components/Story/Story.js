import React from "react";
import './Story.css'
import { Link } from "react-router-dom";

function Story({ story }) {
 return (
   <Link to={`/story/${story.id}`} style={{ textDecoration: 'none' }}>
     <div className="story-card">
       <img src={story.cover} alt={story.title} className="story-cover" />
       <div className="story-info">
         <h3 className="story-title">{story.title}</h3>
         <p className="story-author">{story.author}</p>
         <div className="story-genres">
           {story.genres.map((genre) => (
             <span key={genre} className="genre-tag">
               {genre}
             </span>
           ))}
         </div>
       </div>
       <div className="story-overlay">
         <button className="read-button">Đọc Ngay</button>
         <p className="story-description">{story.description}</p>
       </div>
     </div>
   </Link>
 );
}

export default Story;