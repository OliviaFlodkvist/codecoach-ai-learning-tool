import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await req.json();

    // Check if we're in development mode
    const isDevelopment =
      process.env.NODE_ENV === "development" &&
      process.env.SKIP_OPENAI === "true";

    let data;

    if (isDevelopment) {
      // Development mode: Use existing data from database or mock data
      const existingSession = await prisma.dailySession.findUnique({
        where: { id: sessionId },
        include: {
          keywords: { orderBy: { order: "asc" } },
          quiz_questions: { orderBy: { order: "asc" } },
        },
      });

      if (existingSession?.summary) {
        // Use existing generated data
        data = {
          summary: existingSession.summary,
          keywords: existingSession.keywords.map((k) => ({
            keyword: k.keyword,
            detail_text: k.detail_text,
          })),
          quiz: existingSession.quiz_questions.map((q) => ({
            question_text: q.question_text,
            answer: q.answer,
            options: q.options as string[] | null,
          })),
        };
      } else {
        // Use mock data for development
        data = {
          summary:
            "You created a full-stack authentication system for 'CodeCoach' with comprehensive user management, database integration, and modern UI components.",
          keywords: [
            {
              keyword: "Data Flow Understanding",
              detail_text:
                "You struggled with why first_name/last_name weren't saving.\nGap: Not tracking how data transforms from UI → API → Database\nStudy: Request/response lifecycle, payload mapping",
            },
            {
              keyword: "Module System",
              detail_text:
                "Confusion about bcryptjs import errors.\nGap: How npm packages work, node_modules, dependency resolution\nStudy: CommonJS vs ES Modules, package.json dependencies",
            },
            {
              keyword: "Async/Await Pattern",
              detail_text:
                "You used it correctly but may not fully understand promises.\nGap: \nStudy: JavaScript event loop, promise chains",
            },
            {
              keyword: "TypeScript Basics",
              detail_text:
                "Using types but relying on any and implicit types.\nGap: \nStudy: Type inference, interfaces, generics",
            },
            {
              keyword: "CSS Layout (Tailwind)",
              detail_text:
                "Needed multiple attempts for symmetric divider lines.\nGap: CSS Box Model, flex/grid context\nStudy: How percentage widths are calculated relative to parent containers",
            },
          ],
          quiz: [
            {
              question_text:
                "What is the purpose of NextAuth.js in authentication?",
              answer: "Handles authentication flows and session management",
              options: [
                "Database management",
                "Handles authentication flows and session management",
                "CSS styling",
                "API routing",
              ],
            },
            {
              question_text:
                "Which Prisma method is used to find a unique record?",
              answer: "findUnique",
              options: ["findFirst", "findUnique", "findMany", "create"],
            },
            {
              question_text: "What does bcryptjs do?",
              answer: "Hashes passwords securely",
              options: [
                "Validates forms",
                "Hashes passwords securely",
                "Creates databases",
                "Manages sessions",
              ],
            },
            {
              question_text:
                "In Next.js, what is the purpose of 'use client' directive?",
              answer: "Makes a component run on the client side",
              options: [
                "Server-side rendering",
                "Makes a component run on the client side",
                "Database queries",
                "Authentication",
              ],
            },
            {
              question_text: "What is the main benefit of using TypeScript?",
              answer: "Type safety and better developer experience",
              options: [
                "Faster execution",
                "Type safety and better developer experience",
                "Smaller bundle size",
                "Better SEO",
              ],
            },
          ],
        };
      }
    } else {
      // Production mode: Use OpenAI
      const dailySession = await prisma.dailySession.findUnique({
        where: { id: sessionId },
      });

      if (!dailySession || !dailySession.raw_md_file) {
        return NextResponse.json(
          { error: "No markdown file found" },
          { status: 404 }
        );
      }

      // Prompt OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-5-nano",
        messages: [
          {
            role: "system",
            content: `
You are CodeCoach, an AI assistant that analyzes coding sessions and helps developers learn from their work.

Analyze the markdown file containing coding interactions and generate:

1. SUMMARY: A comprehensive summary of what the user built/accomplished today
2. KEYWORDS: 5 knowledge gaps or concepts the user struggled with, each with:
   - A clear keyword/topic name
   - Detailed explanation of what they struggled with and what to study
3. QUIZ: 5 quiz questions testing understanding of the concepts

Return JSON with this exact schema:
{
  "summary": "Detailed summary of what was built/accomplished",
  "keywords": [
    {
      "keyword": "Topic Name",
      "detail_text": "Description of the struggle and what to study next"
    }
  ],
  "quiz": [
    {
      "question_text": "Quiz question",
      "answer": "Correct answer",
      "options": ["Option A", "Option B", "Option C", "Option D"]
    }
  ]
}

Focus on practical learning opportunities and specific technical concepts.`,
          },
          {
            role: "user",
            content: `Analyze this coding session and generate a summary, knowledge gaps, and quiz questions:\n\n${dailySession.raw_md_file}`,
          },
        ],
        reasoning_effort: "medium",
        verbosity: "medium",
      });

      // Parse JSON output
      data = JSON.parse(response.choices[0].message?.content || "{}");
    }

    // Only save to database in production mode
    if (!isDevelopment) {
      // Clear existing data for this session first
      await prisma.keyword.deleteMany({
        where: { daily_session_id: sessionId },
      });

      await prisma.quizQuestion.deleteMany({
        where: { daily_session_id: sessionId },
      });

      // Save to DB
      await prisma.dailySession.update({
        where: { id: sessionId },
        data: { summary: data.summary },
      });

      for (let i = 0; i < data.keywords.length; i++) {
        await prisma.keyword.create({
          data: {
            daily_session_id: sessionId,
            keyword: data.keywords[i].keyword,
            detail_text: data.keywords[i].detail_text,
            order: i + 1,
          },
        });
      }

      for (let i = 0; i < data.quiz.length; i++) {
        await prisma.quizQuestion.create({
          data: {
            daily_session_id: sessionId,
            question_text: data.quiz[i].question_text,
            answer: data.quiz[i].answer,
            options: data.quiz[i].options,
            order: i + 1,
          },
        });
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("OpenAI error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
