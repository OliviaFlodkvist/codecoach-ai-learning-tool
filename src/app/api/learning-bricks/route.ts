import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Define 15 programming areas with comprehensive keyword matching
const PROGRAMMING_AREAS = {
  // System Integration
  API: {
    keywords: [
      "api",
      "rest",
      "endpoint",
      "http",
      "client",
      "server",
      "request",
      "response",
      "fetch",
      "axios",
      "graphql",
    ],
    category: "SYSTEM_INTEGRATION" as const,
  },
  MICROSERVICES: {
    keywords: [
      "microservice",
      "service",
      "distributed",
      "architecture",
      "module",
      "component",
      "service-oriented",
      "SOA",
    ],
    category: "SYSTEM_INTEGRATION" as const,
  },
  WEBHOOKS: {
    keywords: [
      "webhook",
      "callback",
      "event",
      "notification",
      "trigger",
      "event-driven",
    ],
    category: "SYSTEM_INTEGRATION" as const,
  },
  AUTHENTICATION: {
    keywords: [
      "auth",
      "authentication",
      "authorization",
      "token",
      "session",
      "login",
      "credential",
      "oauth",
      "jwt",
      "nextauth",
    ],
    category: "SYSTEM_INTEGRATION" as const,
  },
  ELT_TOOLS: {
    keywords: [
      "elt",
      "etl",
      "transform",
      "extract",
      "load",
      "pipeline",
      "data",
      "data flow",
      "processing",
    ],
    category: "SYSTEM_INTEGRATION" as const,
  },
  MIDDLEWARE: {
    keywords: [
      "middleware",
      "intercept",
      "filter",
      "proxy",
      "gateway",
      "router",
    ],
    category: "SYSTEM_INTEGRATION" as const,
  },

  // Cloud Computing
  IAAS: {
    keywords: [
      "infrastructure",
      "iaas",
      "cloud",
      "virtual machine",
      "vm",
      "compute",
      "storage",
      "cloud computing",
    ],
    category: "CLOUD_COMPUTING" as const,
  },
  PAAS: {
    keywords: [
      "platform",
      "paas",
      "deployment",
      "environment",
      "service",
      "platform as a service",
    ],
    category: "CLOUD_COMPUTING" as const,
  },
  FAAS: {
    keywords: [
      "function",
      "faas",
      "lambda",
      "serverless",
      "event-driven",
      "function as a service",
    ],
    category: "CLOUD_COMPUTING" as const,
  },
  CONTAINERS: {
    keywords: [
      "container",
      "docker",
      "kubernetes",
      "image",
      "pod",
      "orchestration",
      "containerization",
    ],
    category: "CLOUD_COMPUTING" as const,
  },
  DEVOPS: {
    keywords: [
      "devops",
      "ci/cd",
      "pipeline",
      "deploy",
      "build",
      "release",
      "automation",
      "continuous",
      "integration",
    ],
    category: "CLOUD_COMPUTING" as const,
  },
  NETWORKING: {
    keywords: [
      "network",
      "tcp",
      "ip",
      "dns",
      "load balancer",
      "cdn",
      "latency",
      "protocol",
    ],
    category: "CLOUD_COMPUTING" as const,
  },
  CON: {
    keywords: [
      "configuration",
      "config",
      "environment",
      "setting",
      "variable",
      "parameter",
      ".env",
    ],
    category: "CLOUD_COMPUTING" as const,
  },

  // Additional areas
  DATABASE: {
    keywords: [
      "database",
      "sql",
      "nosql",
      "query",
      "schema",
      "model",
      "orm",
      "migration",
      "prisma",
      "postgresql",
      "mysql",
      "mongodb",
    ],
    category: "DATA_MANAGEMENT" as const,
  },
  FRONTEND: {
    keywords: [
      "react",
      "vue",
      "angular",
      "component",
      "ui",
      "interface",
      "dom",
      "css",
      "frontend",
      "javascript",
      "typescript",
      "jsx",
      "tailwind",
    ],
    category: "DEVELOPMENT" as const,
  },
  BACKEND: {
    keywords: [
      "server",
      "node.js",
      "express",
      "api",
      "controller",
      "route",
      "handler",
      "backend",
      "endpoint",
      "json",
    ],
    category: "DEVELOPMENT" as const,
  },
};

type ProgrammingArea = keyof typeof PROGRAMMING_AREAS;

export async function GET(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions as any)) as any;
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Fetch all quiz results with their sessions and keywords
    const quizResults = await prisma.quizResult.findMany({
      where: {
        daily_session: {
          member_id: userId,
        },
      },
      include: {
        daily_session: {
          include: {
            keywords: {
              orderBy: { order: "asc" },
            },
            quiz_questions: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
      orderBy: {
        completed_at: "desc",
      },
    });

    // Initialize scores for each area
    const areaScores: Record<
      ProgrammingArea,
      { correct: number; total: number }
    > = {} as any;
    for (const area of Object.keys(PROGRAMMING_AREAS) as ProgrammingArea[]) {
      areaScores[area] = { correct: 0, total: 0 };
    }

    // Process each quiz result
    for (const result of quizResults) {
      const correctAnswers = result.correct_answers as number[];
      const sessionKeywords = result.daily_session.keywords;
      const quizQuestions = result.daily_session.quiz_questions;

      // For each quiz question, find the matching keyword and area
      for (let i = 0; i < quizQuestions.length; i++) {
        const question = quizQuestions[i];
        const questionOrder = question.order;
        const isCorrect = correctAnswers.includes(questionOrder);

        // Find the corresponding keyword for this question
        // Questions and keywords should have the same order
        const matchingKeyword = sessionKeywords.find(
          (k) => k.order === questionOrder
        );

        if (matchingKeyword) {
          // Find which area(s) this keyword matches
          // Clean keyword by removing numbers, prefixes, and converting to lowercase
          const cleanedKeyword = matchingKeyword.keyword
            .replace(/^\d+\.\s*/, "") // Remove leading numbers and dots
            .toLowerCase()
            .trim();

          // Split into words for better matching
          const keywordWords = cleanedKeyword
            .split(/[\s-]+/)
            .filter((w) => w.length > 2); // Only meaningful words

          for (const [areaName, areaData] of Object.entries(
            PROGRAMMING_AREAS
          )) {
            const matches = areaData.keywords.some((kw) => {
              const kwLower = kw.toLowerCase();
              // Check if keyword contains the term OR if any word matches
              return (
                cleanedKeyword.includes(kwLower) ||
                keywordWords.some(
                  (word) =>
                    word.includes(kwLower) ||
                    kwLower.includes(word) ||
                    // Handle compound terms like "ci/cd", "node.js"
                    kwLower.includes(word.replace(/[^a-z0-9]/g, ""))
                )
              );
            });

            if (matches) {
              const area = areaName as ProgrammingArea;
              areaScores[area].total += 1;
              if (isCorrect) {
                areaScores[area].correct += 1;
              }
            }
          }
        }
      }
    }

    // Calculate percentages for each area and organize by category
    const categoryData: Record<
      string,
      Array<{ name: string; percentage: number }>
    > = {
      SYSTEM_INTEGRATION: [],
      CLOUD_COMPUTING: [],
    };

    for (const [areaName, scores] of Object.entries(areaScores)) {
      const area = areaName as ProgrammingArea;
      const percentage =
        scores.total > 0
          ? Math.round((scores.correct / scores.total) * 100)
          : 0;

      const category = PROGRAMMING_AREAS[area].category;
      if (!categoryData[category]) {
        categoryData[category] = [];
      }

      categoryData[category].push({
        name: areaName,
        percentage,
      });
    }

    return NextResponse.json({ categoryData });
  } catch (error: any) {
    console.error("Error fetching learning bricks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
