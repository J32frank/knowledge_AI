import React from 'react'; // Add this line
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Loading from '../../_components/loading';
import { FaArrowRight } from 'react-icons/fa';
import { getVideo } from "@/config/service";
import { chapterData } from '@/app/db/schema'; // Rename the import
import { useRouter } from 'next/navigation';
import { db } from '@/app/db/db';
import { handleGenerate_AI } from '@/config/AiMobel';

const HandleStartCourse = ({ course }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleGeneratePromptAndVideo = async () => {
    if (!course || !course.courseId || !course.courseTitle || !course.courseLayout) {
      console.error("Invalid course data provided", course);
      setError("Invalid course data. Please try again.");
      return;
    }
    setLoading(true);
    setError(null);

    const { courseId, courseTitle, courseLayout } = course;
    console.log("Course data:", {
      courseId,
      courseTitle,
      courseLayout: courseLayout.map(chapter => ({
        title: chapter.title,
        about: chapter.about || 'No about information provided'
      }))
    });

    try {
      for (let i = 0; i < courseLayout.length; i++) {
        const chapter = courseLayout[i];
        console.log(`Processing chapter ${i + 1}:`, chapter);

        if (!chapter || typeof chapter !== 'object') {
          throw new Error(`Invalid chapter data for chapter ${i + 1}: Chapter is not an object`);
        }

        if (!chapter.title) {
          throw new Error(`Invalid chapter data for chapter ${i + 1}: Missing title`);
        }

        const chapterTitle = chapter.title;
        const chapterAbout = chapter.about || `About information for ${chapterTitle}`;

        // Fetch YouTube video
        let videoData;
        try {
          const searchQuery = `${courseTitle} ${chapterTitle}`;
          console.log("Fetching video for:", searchQuery);
          videoData = await getVideo(searchQuery);
          console.log("Video data received:", videoData);
        } catch (videoError) {
          console.error("Error fetching video:", videoError);
          throw new Error(`Failed to fetch video content for chapter ${i + 1}: ${videoError.message}`);
        }

        const videoId = videoData?.id?.videoId || "";

        // Prepare chapter data
        const chapterDataToInsert = {
          courseId: courseId,
          chapterId: `${courseId}_chapter_${i + 1}`,
          chapterContent: JSON.stringify({
            title: chapterTitle,
            about: chapterAbout,
          }),
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          chapterInt: `${i + 1}`,
          chapterImage: null, // Add this line
          chapterQuiz: null, // Add this line
        };

        // Save chapter data to database
        console.log("Attempting to save to database:", chapterDataToInsert);

        try {
          const result = await db.insert(chapterData).values(chapterDataToInsert);
          console.log(`Chapter ${i + 1} saved successfully:`, result);
        } catch (dbError) {
          console.error(`Error saving chapter ${i + 1} to database:`, dbError);
          throw new Error(`Failed to save chapter ${i + 1}: ${dbError.message}`);
        }
      }

      console.log("All chapters processed, redirecting...");
      router.push(`/create-course/${courseId}/done`);
    } catch (error) {
      console.error("Error in course creation process:", error);
      setError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {loading && <Loading />}
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-end m-4">
        <Button
          onClick={handleGeneratePromptAndVideo}
          className="flex items-center bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 mt-6 px-4 rounded-lg shadow-lg"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Start course'}
          <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default HandleStartCourse;
