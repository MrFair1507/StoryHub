import React from "react";
import MangaDetails from "../MangaDetails/MangaDetails";
import Header from "../Header/Header";
import './StoryPage.css';
import ChapterUpload from "../ChapterUpload/ChapterUpload";



function StoryPage() {
 return (
  <div className="story-page">
      <Header />
      <MangaDetails />
      <ChapterUpload />
    </div>
 );
}

export default StoryPage;