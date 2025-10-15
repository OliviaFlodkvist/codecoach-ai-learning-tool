-- CreateTable
CREATE TABLE "public"."QuizResult" (
    "id" SERIAL NOT NULL,
    "daily_session_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "total_questions" INTEGER NOT NULL,
    "correct_answers" JSONB NOT NULL,
    "user_answers" JSONB NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuizResult_daily_session_id_idx" ON "public"."QuizResult"("daily_session_id");

-- CreateIndex
CREATE INDEX "QuizResult_completed_at_idx" ON "public"."QuizResult"("completed_at");

-- AddForeignKey
ALTER TABLE "public"."QuizResult" ADD CONSTRAINT "QuizResult_daily_session_id_fkey" FOREIGN KEY ("daily_session_id") REFERENCES "public"."DailySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
