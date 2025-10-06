import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const userId = parseInt(session.user.id);

    // Get the daily session with all related data
    const dailySession = await prisma.dailySession.findFirst({
      where: {
        id: parseInt(sessionId),
        member_id: userId, // Ensure user can only access their own sessions
      },
      include: {
        keywords: {
          orderBy: { order: "asc" },
        },
        quiz_questions: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!dailySession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (!dailySession.summary) {
      return NextResponse.json(
        { error: "No summary generated for this session" },
        { status: 404 }
      );
    }

    // Format the data for the frontend
    const summaryData = {
      summary: dailySession.summary,
      keywords: dailySession.keywords.map((k) => ({
        keyword: k.keyword,
        detail_text: k.detail_text,
      })),
      quiz: dailySession.quiz_questions.map((q) => ({
        question_text: q.question_text,
        answer: q.answer,
        options: q.options as string[] | null,
      })),
    };

    return NextResponse.json(summaryData);
  } catch (error: any) {
    console.error("Summary fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
