import React from "react";
import MangaDetails from "./Components/MangaDetails/MangaDetails";
import MangaContent from "./Components/MangaContent/MangaContent";
import Header from "./Components/Header/Header";
import "./App.css";
const App = () => {
  return (
    <div className="app">
      <Header />
      <MangaDetails />
      <MangaContent />
    </div>
  );
};
export default App;
