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

    // Get user data from database
    const user = await prisma.member.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        profession: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate initials from first and last name
    const initials = `${user.first_name.charAt(0)}${user.last_name.charAt(
      0
    )}`.toUpperCase();

    // Format profession for display
    const professionMap: { [key: string]: string } = {
      student: "Student",
      developer: "Developer",
      designer: "Designer",
      other: "Other",
    };

    const formattedUser = {
      id: user.id,
      initials,
      name: `${user.first_name} ${user.last_name}`,
      role: professionMap[user.profession] || "Other",
      email: user.email,
      profession: user.profession,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ user: formattedUser });
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
