'use client';

import React, { useEffect, useState } from 'react';
import { FaRegCopy, FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { db } from "@/app/db/db";
import { courseData } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export default function DonePage({ params }) {
  const router = useRouter(); // Initialize the router
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const result = await db
          .select()
          .from(courseData)
          .where(eq(courseData.courseId, params.coursePage));

        if (result.length > 0) {
          setCourse(result[0]);
        } else {
          setError("No course found with that ID");
        }
      } catch (error) {
        setError("Error fetching course data");
        console.error("Error fetching course data:", error);
      }
      setLoading(false);
    };

    if (params?.coursePage) {
      fetchCourse();
    } else {
      setError('No courseId found in params.');
    }
  }, [params]);

  const handleCopyLink = () => {
    const courseLink = `${window.location.origin}/create-course/${params.coursePage}/done`;
    navigator.clipboard.writeText(courseLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Failed to copy link:', err));
  };

  const handleStartCourse = () => {
    if (course) {
      router.push(`/create-course/${course.courseId}/learningPage`);
    } else {
      console.error('Course data not available');
    }
  };

  if (error) {
    return <div className="text-red-600 text-lg text-center">{error}</div>;
  }

  if (loading || !course) {
    return <p className="text-xl text-center text-gray-600">Loading course data...</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">Congratulations on creating your course!</h1>
      <div className="flex items-center mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          value={`${window.location.origin}/create-course/${params.coursePage}/done`}
          readOnly
          className="bg-secondary text-secondary-foreground rounded-l-md py-3 px-4 flex-grow"
        />
        <button
          onClick={handleCopyLink}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-r-md flex items-center transition-colors duration-200"
        >
          {copied ? 'Copied!' : <FaRegCopy />}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {course?.courseLayout?.map((chapter, index) => (
          <div key={index} className="bg-card text-card-foreground shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <h2 className="text-2xl font-bold mb-3">{chapter.title}</h2>
            <p className="text-muted-foreground mb-4">{chapter.about}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleStartCourse}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-full text-lg flex items-center justify-center mx-auto transition-colors duration-200"
        >
          <FaPlay className="mr-2" />
          Start Course
        </button>
      </div>
    </div>
  );
}
