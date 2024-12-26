import React from 'react';
import './MangaDetails.css';

const MangaDetails = () => {
const mangaData = {
    title: "Magan no Akuyaku ni Tensei Shita no de, Oshi Chara o Mimamoru Mob o Mezashimasu",
    author: "Sekka Iwata",
    description: "A story about a person who was reincarnated as a villain with evil eyes in an otome game. Not wanting to get involved in the game's story, they aim to live as a mob character while watching over their favorite character. However, they keep getting dragged into major events despite their best efforts to avoid them...",
    tags: ["Isekai", "Fantasy", "Reincarnation", "Drama", "Magic"]
};

    return (
        <div className="manga-container">
            <div className="manga-layout">
                <div className="manga-image-container">
                    <img
                        className="manga-image"
                        src="picture.png"
                        alt="Placeholder"
                    />
                </div>
                <div className="manga-content">
                    <h1 className="manga-title">{mangaData.title}</h1>
                    <h2 className="manga-author">{mangaData.author}</h2>
                    <div className="tags-container">
                        {mangaData.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                    <p className="manga-description">{mangaData.description}</p>
                </div>
            </div>
        </div>
    );
};

export default MangaDetails;