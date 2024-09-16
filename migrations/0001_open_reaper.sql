CREATE TABLE IF NOT EXISTS "courseData" (
	"course_id" uuid PRIMARY KEY NOT NULL,
	"course_title" text,
	"course_description" text,
	"levels" text,
	"number_of_chapters" integer,
	"reading_material" text,
	"current_activities" text,
	"course_layout" jsonb,
	"chapters" jsonb,
	"time_allocated" text,
	"books_to_read" jsonb
);
--> statement-breakpoint
DROP TABLE "coursesCreate";