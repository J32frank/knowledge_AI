import React from "react";

const LearningGoal = ({ inputField, textArea, handleChange }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Learning Goal</h2>

      {/* Input Field */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-400">
          Topic
        </label>
        <input
          type="text"
          placeholder="What do you want to learn"
          className="w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
          value={inputField}
          name="inputField"
          onChange={handleChange}
        />
      </div>

      {/* Text Area */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          placeholder="Tell us a little bit about yourself"
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-gray-300"
          rows="4"
          value={textArea}
          name="textArea"
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default LearningGoal;
