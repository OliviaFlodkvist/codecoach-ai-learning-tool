import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Fetch all daily sessions for the user that have summaries
    const sessions = await prisma.dailySession.findMany({
      where: {
        member_id: userId,
        summary: {
          not: null,
        },
      },
      select: {
        id: true,
        date: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedSessions = sessions.map((s) => ({
      id: s.id,
      date: s.date,
      createdAt: s.createdAt,
    }));

    return NextResponse.json({ summaries: formattedSessions });
  } catch (error: any) {
    console.error("Error fetching summaries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
