import { CiTimer } from "react-icons/ci";
import { FaNetworkWired } from "react-icons/fa";
import { courseData } from "@/app/db/schema";
import { LucideLayout, LucideLayoutGrid } from "lucide-react";
import { useState, useEffect } from 'react';
import { AiFillAppstore } from "react-icons/ai";
import { MdNumbers } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";

function CourseLayout({ course }) {
  const [totalDuration, setTotalDuration] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (course?.courseLayout) {
      try {
        // Ensure courseLayout is parsed if it's a string
        const layoutArray = typeof course.courseLayout === 'string'
          ? JSON.parse(course.courseLayout)
          : course.courseLayout;

        const duration = calculateTotalDuration(layoutArray);
        setTotalDuration(duration);
        setErrorMessage('');
      } catch (error) {
        console.error('Error calculating duration:', error);
        setErrorMessage(error.message);
      }
    }
  }, [course]);

  return (
    <div className="mt-4">
      <div className="border-t border-gray-700 w-full rounded-lg p-6 mt-6 ">
        <h2 className="text-2xl font-bold text-gray-900 pl-4 flex">
          <LucideLayout size={28} className="pr-2 text-gray-950" />
          COURSE LAYOUT
        </h2>
        <div className="border border-gray-400 w-full p-6 mt-2 rounded-xl grid grid-cols-4 ">
          <div className="flex items-center">
            <MdNumbers className="text-blue-600 mr-2" size={24} />
            <p className="text-gray-500 text-sm">NO OF CHAPTERS:</p>
            <h2 className='text-gray-900 text-1.5xl ml-2'>{Array.isArray(course?.courseLayout) ? course.courseLayout.length : 'N/A'}</h2>
          </div>
          <div className="flex items-center">
            <CiTimer className="text-blue-600 mr-2" size={24} />
            <h2 className="text-gray-500">Total Duration:</h2>
            <span className='text-gray-900 text-1xl ml-2'>{errorMessage ? 'Error' : (totalDuration ? formatDuration(totalDuration) : 'N/A')}</span>
          </div>
          <div className="flex items-center">
            <FaNetworkWired className="text-blue-600 mr-2" size={24} />
            <h2 className="text-gray-500">ACTIVITIES:</h2>
            <h1 className="text-text-1.5xl gray-900 ml-2">{course.currentActivities}</h1>
          </div>
          <div className="flex items-center">
            <SiLevelsdotfyi className="text-blue-600 mr-2" size={24} />
            <h1 className="text-1xl text-gray-500">LEVELS:</h1>
            <h1 className="text-2xl text-gray-900 ml-2">{course.levels}</h1>
          </div>
        </div>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  )
}




function calculateTotalDuration(courseLayout) {
  if (!Array.isArray(courseLayout)) {
    throw new Error('Course layout is not an array');
  }
  return courseLayout.reduce((total, chapter, index) => {
    try {
      return total + parseDuration(chapter.time_allocated);
    } catch (error) {
      throw new Error(`Error in chapter ${index + 1}: ${error.message}`);
    }
  }, 0);
}

function parseDuration(durationString) {
  if (typeof durationString !== 'string') {
    throw new Error('Duration is not a string');
  }
  const [value, unit] = durationString.split(' ');
  const numericValue = parseFloat(value);
  
  if (isNaN(numericValue)) {
    throw new Error(`Invalid duration value: ${value}`);
  }
  
  switch (unit.toLowerCase()) {
    case 'hour':
    case 'hours':
      return numericValue;
    case 'minute':
    case 'minutes':
      return numericValue / 60;
    default:
      throw new Error(`Unexpected time unit: ${unit}`);
  }
}

function formatDuration(hours) {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (minutes === 0) {
    return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''}`;
  } else {
    return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
}

export default CourseLayout
