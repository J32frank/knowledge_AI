import { useState } from 'react';
import { IoIosTime } from "react-icons/io";
import { FaBookReader } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";

function CourseList({ course }) {
  return (
    <div className="mt-3">
      <h1 className="text-2xl font-bold mb-4 text-gray-950 text-.9">{course.courseTitle}</h1>
      {course?.courseLayout && Array.isArray(course.courseLayout) ? (
        course.courseLayout.map((chapter, index) => (
          <div key={index} className="mb-6 border border-gray-400 rounded-lg p-4 text-gray-950 shadow-sm relative">
            <div className="flex items-center mb-2">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                {chapter.chapter}
              </div>
              <h2 className="text-xl font-semibold flex-grow">{chapter.title}</h2>
              <CiBookmarkCheck className="text-green-500 ml-2" />
            </div>
            <p className="text-blue-700 mb-2 flex items-center">
              <IoIosTime className="text-blue-700 mr-2" />
              Duration: {chapter.time_allocated}
            </p>
            <p className="mb-4">{chapter.about}</p>
            <ReadingMaterials materials={chapter.reading_materials} />
          </div>
        ))
      ) : (
        <p>No course layout available.</p>
      )}
    </div>
  )
}

function ReadingMaterials({ materials }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="text-blue-600 hover:underline flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBookReader className="mr-2" />
        {isOpen ? 'Hide Reading Materials' : 'Show Reading Materials'}
      </button>
      {isOpen && (
        <ul className="list-disc list-inside mt-2">
          {materials.map((material, materialIndex) => (
            <li key={materialIndex}>
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {material.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseList;
