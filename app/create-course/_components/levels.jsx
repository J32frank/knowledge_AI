import React, { useState } from "react";

const categories = [
  { name: "Beginner", image: "https://via.placeholder.com/40" },
  { name: "Intermediate", image: "https://via.placeholder.com/40" },
  { name: "Advance", image: "https://via.placeholder.com/40" },
];

const Levels = ({ onCategorySelect, onLevelSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedLevel(null); // Reset level selection when category changes
    onCategorySelect(categoryName);
  };

  const handleLevelClick = (levelName) => {
    setSelectedLevel(levelName);
    onLevelSelect(levelName); // Notify parent about the selected level
  };

  return (
    <div className="flex flex-col items-center mt-20">
      {/* Level Selection */}
      <h3 className="text-lg font-bold mb-4">Select Level:</h3>
      <div className="flex justify-center space-x-6">
        {categories.map((level) => (
          <div
            key={level.name}
            className={`p-2 rounded-lg flex flex-col items-center justify-center border-2 transition-all cursor-pointer border-black bg-white hover:border-blue-500 hover:bg-blue-100 w-64 h-48 ${
              selectedLevel === level.name
                ? "border-blue-600 bg-gray-900 text-white"
                : ""
            }`}
            onClick={() => handleLevelClick(level.name)}
          >
            {/* Image */}
            <img
              src={level.image}
              alt={level.name}
              className="rounded-full mb-2 w-20 h-20"
            />
            {/* Label */}
            <span className="text-black">{level.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Levels;
