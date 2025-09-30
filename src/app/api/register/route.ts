import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");
    const first_name = body.first_name ? String(body.first_name) : undefined;
    const last_name = body.last_name ? String(body.last_name) : undefined;
    const profession = body.profession ? String(body.profession) : undefined;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.member.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const member = await prisma.member.create({
      data: {
        email,
        password: hashed,
        first_name: first_name ?? "",
        last_name: last_name ?? "",
        profession: profession as any,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        profession: true,
      },
    });

    return NextResponse.json({ member }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to register" },
      { status: 400 }
    );
  }
}
