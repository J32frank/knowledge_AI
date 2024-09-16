"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/db/db";
import { courseData } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import Details from "./_components/details";
import CourseLayout from "./_components/courseLayout";
import CourseList from "./_components/courseList";
import HandleStartCourse from "./_components/handleStartCourse";
import Loading from "../_components/loading";

const CoursePage = ({ params }) => {
  const [course, setCourse] = useState([]);``
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Params object:', params);
    console.log('courseId:', params?.coursePage);

    const fetchCourse = async () => {
      setLoading(true);
      try {
        console.log("Fetching course data with courseId:", params.coursePage);

        const result = await db
          .select()
          .from(courseData)
          .where(eq(courseData.courseId, params.coursePage));

        console.log("Query result:", result);

        if (result.length > 0) {
          setCourse(result[0]);
          console.log("Fetched course data:", result[0]);
        } else {
          setError("No course found with that ID");
          console.log("No course found with that ID");
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
      console.error('No courseId found in params.');
    }
  }, [params]);

  return (
    <div className=" mt-10 px-8 md:px-20 lg:px-44">
      <h1 className="font-bold text-3xl mt-6 text-gray-900 text-center">
        Edit Course
      </h1>
      {error ? (
        <div className="text-red-600 text-lg text-center">{error}</div>
      ) : course ? (
        <div className="">
        <Loading loading={loading} />
          <Details course={course} />
          <CourseLayout course={course} />
          <CourseList  course={course} />
          <div>
            <HandleStartCourse course={course} />
          </div>
        </div>
      ) : (
        <p className="text-xl text-center text-gray-600">Loading course data...</p>
      )}
    </div>
  );
};

export default CoursePage;
