import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const {
      sessionId,
      score,
      percentage,
      totalQuestions,
      correctAnswers,
      userAnswers,
    } = await req.json();

    // Verify the session belongs to the user
    const dailySession = await prisma.dailySession.findFirst({
      where: {
        id: sessionId,
        member_id: userId,
      },
    });

    if (!dailySession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Save the quiz result
    const quizResult = await prisma.quizResult.create({
      data: {
        daily_session_id: sessionId,
        score,
        percentage,
        total_questions: totalQuestions,
        correct_answers: correctAnswers,
        user_answers: userAnswers,
      },
    });

    return NextResponse.json({
      success: true,
      result: quizResult,
    });
  } catch (error: any) {
    console.error("Error saving quiz result:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    // Get quiz results for the session
    const quizResults = await prisma.quizResult.findMany({
      where: {
        daily_session_id: parseInt(sessionId),
        daily_session: {
          member_id: userId,
        },
      },
      orderBy: {
        completed_at: "desc",
      },
    });

    return NextResponse.json({ results: quizResults });
  } catch (error: any) {
    console.error("Error fetching quiz results:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
