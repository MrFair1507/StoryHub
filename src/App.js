import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import MainContent from "./Components/MainContent/MainContent";
import StoryPage from "./Components/StoryPage/StoryPage";
import "./App.css";
import CreateStory from "./Components/CreateStory/CreateStory";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="app"><Header/><MainContent/></div>} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/create-story" element={<div><Header/><CreateStory /></div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;