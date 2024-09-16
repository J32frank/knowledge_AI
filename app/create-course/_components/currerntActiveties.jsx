import React, { useState, useEffect } from "react";
import { setSelectedValue } from "./storage";

const CurrentActivities = ({ initialValue, validate }) => {
  const [selectedModel, setSelectedModel] = useState(
    initialValue || "Studying"
  );

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setSelectedValue(model); // Store the selected value in storage
  };

  useEffect(() => {
    setSelectedModel(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (validate) {
      validate(selectedModel);
    }
  }, [validate, selectedModel]);

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-900">
        Current Activities
      </h2>
      <p className="text-center text-gray-500 mt-2">
        What Are You Currently Doing?
      </p>

      <div className="mt-6 space-y-4">
        <div
          className={`cursor-pointer p-4 border rounded-lg flex items-center ${
            selectedModel === "Studying"
              ? "border-purple-500"
              : "border-gray-300"
          }`}
          onClick={() => handleModelChange("Studying")}
        >
          <input
            type="radio"
            name="businessModel"
            className="mr-4"
            checked={selectedModel === "Studying"}
            readOnly
          />
          <label className="text-gray-800">Studying</label>
        </div>

        <div
          className={`cursor-pointer p-4 border rounded-lg flex items-center ${
            selectedModel === "Working"
              ? "border-purple-500"
              : "border-gray-300"
          }`}
          onClick={() => handleModelChange("Working")}
        >
          <input
            type="radio"
            name="businessModel"
            className="mr-4"
            checked={selectedModel === "Working"}
            readOnly
          />
          <label className="text-gray-800">Working</label>
        </div>

        <div
          className={`cursor-pointer p-4 border rounded-lg flex items-center ${
            selectedModel === "Nothing"
              ? "border-purple-500"
              : "border-gray-300"
          }`}
          onClick={() => handleModelChange("Nothing")}
        >
          <input
            type="radio"
            name="businessModel"
            className="mr-4"
            checked={selectedModel === "Nothing"}
            readOnly
          />
          <label className="text-gray-800">Nothing</label>
        </div>
      </div>
    </div>
  );
};

export default CurrentActivities;
