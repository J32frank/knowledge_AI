CREATE TABLE IF NOT EXISTS "chapterData" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar,
	"chapterId" varchar,
	"videoUrl" varchar,
	"chapterContent" jsonb,
	"chapterImage" varchar,
	"chapterQuiz" jsonb,
	"chapterInt" varchar
);
