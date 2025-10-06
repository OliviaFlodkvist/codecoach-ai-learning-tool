-- CreateTable
CREATE TABLE "public"."DailySession" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "summary" TEXT,
    "raw_md_file" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailySession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Keyword" (
    "id" SERIAL NOT NULL,
    "daily_session_id" INTEGER NOT NULL,
    "keyword" TEXT NOT NULL,
    "detail_text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."QuizQuestion" (
    "id" SERIAL NOT NULL,
    "daily_session_id" INTEGER NOT NULL,
    "question_text" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "options" JSONB,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailySession_member_id_idx" ON "public"."DailySession"("member_id");

-- CreateIndex
CREATE INDEX "DailySession_date_idx" ON "public"."DailySession"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DailySession_member_id_date_key" ON "public"."DailySession"("member_id", "date");

-- CreateIndex
CREATE INDEX "Keyword_daily_session_id_idx" ON "public"."Keyword"("daily_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_daily_session_id_order_key" ON "public"."Keyword"("daily_session_id", "order");

-- CreateIndex
CREATE INDEX "QuizQuestion_daily_session_id_idx" ON "public"."QuizQuestion"("daily_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "QuizQuestion_daily_session_id_order_key" ON "public"."QuizQuestion"("daily_session_id", "order");

-- AddForeignKey
ALTER TABLE "public"."DailySession" ADD CONSTRAINT "DailySession_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "public"."Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Keyword" ADD CONSTRAINT "Keyword_daily_session_id_fkey" FOREIGN KEY ("daily_session_id") REFERENCES "public"."DailySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."QuizQuestion" ADD CONSTRAINT "QuizQuestion_daily_session_id_fkey" FOREIGN KEY ("daily_session_id") REFERENCES "public"."DailySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
