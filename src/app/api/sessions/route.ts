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

    const userId = parseInt(session.user.id);

    // Get all sessions for the current user that have quiz questions
    const sessions = await prisma.dailySession.findMany({
      where: {
        member_id: userId,
        quiz_questions: {
          some: {}, // Only sessions that have quiz questions
        },
      },
      include: {
        quiz_questions: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format the data for the frontend
    const formattedSessions = sessions.map((s) => ({
      id: s.id,
      date: s.date,
      quizCount: s.quiz_questions.length,
    }));

    return NextResponse.json(formattedSessions);
  } catch (error: any) {
    console.error("Sessions fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
