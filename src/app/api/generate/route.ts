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

    // Get raw markdown file from DB
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
    const data = JSON.parse(response.choices[0].message?.content || "{}");

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

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("OpenAI error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
