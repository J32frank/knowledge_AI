import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Category = ({
  setTypeSelect, // Function to set the type select state
  setCourseGoal, // Function to set the course goal state
  numberOfChapters, // Current number of chapters
  setNumberOfChapters, // Function to update the number of chapters
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 p-10">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-max">
        <div className="col-span-2 md:col-span-1 mt-10">
          <label className="block text-black text-lg font-semibold mb-2">
            No of Chapters
          </label>
          <input
            type="number"
            value={numberOfChapters} // Set the value to the state
            onChange={(e) => setNumberOfChapters(e.target.value)} // Update state on change
            className="text-gray-900 text-2xl pl-2 border border-black bg-gray-100 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="0"
          />
        </div>
        <div className="col-span-2 md:col-span-1 mt-10 pb-10">
          <label className="block text-black text-lg font-semibold mb-2">
            Select Theme 2
          </label>
          <Select onValueChange={setTypeSelect}>
            {" "}
            {/* Handle value change for Theme 2 */}
            <SelectTrigger className="w-full text-gray-800 border-gray-900">
              <SelectValue placeholder="Select Theme 2" />
            </SelectTrigger>
            <SelectContent className="text-gray-800 py-2">
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 pb-10">
          <label className="block text-black text-lg font-semibold mb-2">
            Select Course Goal
          </label>
          <Select onValueChange={setCourseGoal}>
            {" "}
            {/* Handle value change for Course Goal */}
            <SelectTrigger className="w-full text-gray-950 border-black">
              <SelectValue placeholder="Select Course Goal" />
            </SelectTrigger>
            <SelectContent className="text-gray-950">
              <SelectItem value="Knowledge-Based">Knowledge-Based</SelectItem>
              <SelectItem value="Skill-Based">Skill-Based</SelectItem>
              <SelectItem value="Value-Based">Value-Based</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Category;
