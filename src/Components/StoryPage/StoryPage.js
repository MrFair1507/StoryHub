import React from "react";
import MangaDetails from "../MangaDetails/MangaDetails";
import Header from "../Header/Header";
import './StoryPage.css';
import StoryPageMainContent from "../StoryPageMainContent/StoryPageMainContent";


function StoryPage() {
 return (
  <div className="story-page">
      <Header />
      <MangaDetails />
      <StoryPageMainContent/>
    </div>
 );
}

export default StoryPage;