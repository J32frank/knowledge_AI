import { pgTable, uuid, text, integer, jsonb, varchar, serial, boolean  } from "drizzle-orm/pg-core";
// import { bytea } from "drizzle-orm/pg-core/pg-data-types";

export const courseData = pgTable("courseData", {
  courseId: uuid("course_id").primaryKey(),
  courseTitle: text("course_title"),
  courseDescription: text("course_description"),
  levels: text("level"),  // Updated column name to match database
  numberOfChapter: integer("number_of_chapters"),
  currentActivities: text("current_activities"),
  courseLayout: jsonb("course_layout"),
  courseImage: varchar("courseImage").default('/placeholder.png'),
  publish: boolean("publish").default(false),

});



export const chapterData = pgTable("chapterData", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId"),
  chapterId: varchar("chapterId"),
  videoUrl: varchar("videoUrl"),
  chapterContent: jsonb("chapterContent"),
  chapterImage: varchar("chapterImage"),
  chapterQuiz: jsonb("chapterQuiz"),
  chapterInt: varchar("chapterInt")
});



