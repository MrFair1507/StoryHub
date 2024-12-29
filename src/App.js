import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import MainContent from "./Components/MainContent/MainContent";
import StoryPage from "./Components/StoryPage/StoryPage";
import CreateStory from "./Components/CreateStory/CreateStory";
import MangaDetails from './Components/MangaDetails/MangaDetails';
import ChapterViewer from "./Components/ChapterViewer/ChapterViewer";
import ChapterUpload from './Components/ChapterUpload/ChapterUpload';
import "./App.css";

const App = () => {
  return (
    <Router future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true 
    }}>
      <Routes>
        <Route path="/" element={<div className="app"><Header/><MainContent/></div>} />
        <Route path="/manga/:id" element={<div><Header/><MangaDetails /></div>} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/create-story" element={<div><Header/><CreateStory /></div>} />
        <Route path="/manga-details" element={<MangaDetails />} />
        <Route path="/chapter/:chapterId" element={<ChapterViewer />} />
        <Route path="/story/:mangaId/upload-chapter" element={<ChapterUpload />} />
      </Routes>
    </Router>
  );
};

export default App;

