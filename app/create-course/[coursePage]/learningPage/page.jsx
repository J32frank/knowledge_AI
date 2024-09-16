'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaHome, FaVideo, FaBook, FaRobot, FaTools, FaCheck, FaPlay } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { db } from "@/app/db/db"
import { chapterData, courseData } from "@/app/db/schema"
import { eq } from "drizzle-orm"
import Image from 'next/image'

export default function LearningPage({ params }) {
  const router = useRouter()
  const [course, setCourse] = useState(null)
  const [chapters, setChapters] = useState([])
  const [activeChapter, setActiveChapter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [completedChapters, setCompletedChapters] = useState({})
  const [videoError, setVideoError] = useState(false);
  const [showReadingMaterials, setShowReadingMaterials] = useState(false)
  const [useDirectLink, setUseDirectLink] = useState(false);
  const [iframeError, setIframeError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseResult = await db
          .select()
          .from(courseData)
          .where(eq(courseData.courseId, params.coursePage))
        
        const chaptersResult = await db
          .select()
          .from(chapterData)
          .where(eq(chapterData.courseId, params.coursePage))
        
        if (courseResult.length > 0 && chaptersResult.length > 0) {
          setCourse(courseResult[0])
          setChapters(chaptersResult)
          setActiveChapter(chaptersResult[0])
          // Initialize completed chapters
          const initialCompletedChapters = chaptersResult.reduce((acc, chapter) => {
            acc[chapter.chapterId] = false;
            return acc;
          }, {});
          setCompletedChapters(initialCompletedChapters);
        } else {
          setError("No course data found")
        }
      } catch (err) {
        setError("Error fetching course data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [params.coursePage])

  const handleChapterClick = (chapter) => {
    setActiveChapter(chapter)
  }

  const handleChapterComplete = (chapterId) => {
    setCompletedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }))
  }

  const calculateProgress = () => {
    if (!chapters) return 0;
    const completedCount = Object.values(completedChapters).filter(Boolean).length;
    return (completedCount / chapters.length) * 100;
  }

  // Helper function to safely parse JSON or return the original value if it's already an object
  const safeJSONParse = (content) => {
    if (typeof content === 'string') {
      try {
        return JSON.parse(content);
      } catch (e) {
        console.error('Error parsing JSON:', e);
        return {};
      }
    }
    return content || {}; // Return an empty object if content is null or undefined
  };

  const getEmbedUrl = (videoUrl) => {
    console.log("Original video URL:", videoUrl); // Log the original URL
    let videoId = videoUrl;
    if (videoUrl.includes('youtube.com')) {
      const urlParams = new URLSearchParams(new URL(videoUrl).search);
      videoId = urlParams.get('v');
    } else if (videoUrl.includes('youtu.be')) {
      videoId = videoUrl.split('/').pop();
    }
    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&color=white`;
    console.log("Embed URL:", embedUrl); // Log the generated embed URL
    return embedUrl;
  };

  const getVideoUrl = (videoUrl) => {
    if (videoUrl.includes('youtube.com')) {
      const urlParams = new URLSearchParams(new URL(videoUrl).search);
      const videoId = urlParams.get('v');
      return `https://www.youtube.com/watch?v=${videoId}`;
    } else if (videoUrl.includes('youtu.be')) {
      const videoId = videoUrl.split('/').pop();
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return videoUrl;
  };

  const getThumbnailUrl = (videoUrl) => {
    let videoId = videoUrl;
    if (videoUrl.includes('youtube.com')) {
      const urlParams = new URLSearchParams(new URL(videoUrl).search);
      videoId = urlParams.get('v');
    } else if (videoUrl.includes('youtu.be')) {
      videoId = videoUrl.split('/').pop();
    }
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  const courseLayout = course ? safeJSONParse(course.courseLayout) : {};

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100 text-gray-800"> {/* Adjusted height for header */}
      {/* Left Sidebar */}
      <div className="w-20 bg-gray-800 flex flex-col items-center py-8 space-y-8">
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
          <FaHome className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
          <FaVideo className="w-6 h-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-gray-700"
          onClick={() => setShowReadingMaterials(!showReadingMaterials)}
        >
          <FaBook className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
          <FaRobot className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
          <FaTools className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Video Player */}
        <div className="h-2/3 bg-gray-100 p-4">
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border-4 border-white">
            {activeChapter && !useDirectLink ? (
              <>
                {iframeError && (
                  <div className="absolute top-0 left-0 w-full bg-red-500 text-white p-2 z-10">
                    Error: {iframeError}
                  </div>
                )}
                <iframe
                  src={getEmbedUrl(activeChapter.videoUrl)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  onError={(e) => {
                    console.error("iframe error:", e);
                    setIframeError(e.message);
                    setUseDirectLink(true);
                  }}
                ></iframe>
              </>
            ) : activeChapter ? (
              <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-white">
                <Image
                  src={getThumbnailUrl(activeChapter.videoUrl)}
                  alt="Video thumbnail"
                  width={480}
                  height={360}
                  className="mb-4"
                />
                <p className="text-xl mb-4">Unable to embed video. Click below to watch on YouTube:</p>
                <Button 
                  onClick={() => window.open(getVideoUrl(activeChapter.videoUrl), '_blank')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Watch on YouTube
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-800">
                <FaPlay className="w-16 h-16 text-white opacity-50" />
              </div>
            )}
          </div>
        </div>

        {/* Chapter Content or Reading Materials */}
        <div className="h-1/3 bg-white p-6 overflow-y-auto">
          {showReadingMaterials ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Reading Materials</h2>
              {courseLayout.reading_materials && courseLayout.reading_materials.map((material, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{material.topic}</h3>
                  <ul className="list-disc pl-5">
                    {material.resources.map((resource, idx) => (
                      <li key={idx}>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : activeChapter && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {safeJSONParse(activeChapter.chapterContent).title}
                </h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {courseLayout.levels}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {safeJSONParse(activeChapter.chapterContent).about}
              </p>
              {courseLayout.key_topics && courseLayout.key_topics.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Key Topics:</h3>
                  <ul className="list-disc pl-5">
                    {courseLayout.key_topics.map((topic, index) => (
                      <li key={index} className="text-gray-600">{topic}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white shadow-md flex flex-col">
        <h2 className="text-2xl font-bold p-6 bg-gray-100">Course Modules</h2>
        <div className="flex-1 overflow-y-auto p-6">
          {chapters.map((chapter, index) => {
            const chapterContent = safeJSONParse(chapter.chapterContent);
            return (
              <div
                key={chapter.chapterId}
                className={`mb-4 p-3 rounded-lg cursor-pointer flex items-center transition-colors border-b-2 border-gray-300 ${
                  activeChapter?.chapterId === chapter.chapterId 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveChapter(chapter)}
              >
                <Checkbox
                  checked={completedChapters[chapter.chapterId]}
                  onCheckedChange={() => handleChapterComplete(chapter.chapterId)}
                  className="mr-3 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{`${index + 1}. ${chapterContent.title}`}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {completedChapters[chapter.chapterId] ? 'Completed' : 'In progress'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-6 border-t-2 border-gray-300">
          <Progress value={calculateProgress()} className="w-full h-2 bg-gray-200" />
          <p className="text-center mt-3 text-gray-600 font-semibold">
            {`${Math.round(calculateProgress())}% Complete`}
          </p>
        </div>
      </div>
    </div>
  )
}
