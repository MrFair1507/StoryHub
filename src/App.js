import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import MainContent from "./Components/MainContent/MainContent";
import StoryPage from "./Components/StoryPage/StoryPage";
import CreateStory from "./Components/CreateStory/CreateStory";
import ChapterViewer from "./Components/ChapterViewer/ChapterViewer";
import ChapterUpload from "./Components/ChapterUpload/ChapterUpload";
import "./App.css";
import MangaDetails from "./Components/MangaDetails/MangaDetails";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header onGenreSelect={handleGenreSelect} />
        <Routes>
          <Route
            path="/"
            element={<MainContent selectedGenre={selectedGenre} />}
          />
          <Route path="/story/:id" element={<StoryPage />} />
          <Route path="/create-story" element={<CreateStory />} />
          <Route path="/manga-details/:id" element={<MangaDetails />} />
          <Route path="/chapter/:chapterId" element={<ChapterViewer />} />
          <Route path="/story/:id/upload" element={<ChapterUpload />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
