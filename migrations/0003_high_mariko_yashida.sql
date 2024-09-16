ALTER TABLE "courseData" ADD COLUMN "level" text;--> statement-breakpoint
ALTER TABLE "courseData" DROP COLUMN IF EXISTS "levels";