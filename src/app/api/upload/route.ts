import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type (only allow markdown files)
    if (file.type !== "text/markdown" && !file.name.endsWith(".md")) {
      return NextResponse.json(
        {
          error: "Only markdown (.md) files are allowed",
        },
        { status: 400 }
      );
    }

    // Read file content
    const fileContent = await file.text();

    // Get current date (YYYY-MM-DD format)
    const today = new Date();
    const dateString = today.toISOString().split("T")[0];

    // Always create a new daily session for each upload
    // This ensures each upload gets a unique session ID
    const dailySession = await prisma.dailySession.create({
      data: {
        member_id: userId,
        date: new Date(dateString),
        raw_md_file: fileContent,
      },
    });

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      sessionId: dailySession.id,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
