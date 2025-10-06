"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface GeneratedData {
  summary: string;
  keywords: Array<{
    keyword: string;
    detail_text: string;
  }>;
  quiz: Array<{
    question_text: string;
    answer: string;
    options: string[] | null;
  }>;
}

export default function SummaryPage() {
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  useEffect(() => {
    if (sessionId) {
      fetchSummaryData(sessionId);
    } else {
      setError("No session ID provided");
      setLoading(false);
    }
  }, [sessionId]);

  const fetchSummaryData = async (sessionId: string) => {
    try {
      // When using OpenAI use: const response = await fetch(`/api/summary?sessionId=${sessionId}`);
      // In development, use generate API to get mock data
      const isDevelopment = process.env.NODE_ENV === "development";
      const endpoint = isDevelopment
        ? `/api/generate`
        : `/api/summary?sessionId=${sessionId}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: parseInt(sessionId) }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary data");
      }
      // When using Open AI use:       const data = await response.json();
      //setGeneratedData(data);
      //const response: Response
      const result = await response.json();
      setGeneratedData(result.data || result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-red-900 via-orange-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-amber-200 text-2xl font-semibold mb-4">
            Loading your summary...
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-200 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !generatedData) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-red-900 via-orange-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-300 text-2xl font-semibold mb-4">Error</div>
          <div className="text-amber-200 mb-6">
            {error || "No summary data found"}
          </div>
          <Link
            href="/codecoach"
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Back to CodeCoach
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-red-900 via-orange-800 to-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-orbitron md:text-8xl font-semibold tracking-wide text-amber-200 whitespace-nowrap mb-4 text-stroke-yellow">
            Today's Summary
          </h1>

          {/* Development Mode Indicator */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                🚧 DEVELOPMENT MODE - Using Mock Data
              </span>
            </div>
          )}
        </div>

        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Today's Summary */}
          <div className="bg-black/40 rounded-2xl p-8 text-white backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-center text-amber-200">
              Today's Summary
            </h2>
            <div className="bg-black/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-amber-200">
                What you have built:
              </h3>
              <div className="text-amber-200 mb-2">
                You created a full-stack authentication system for "CodeCoach"
                with:
              </div>
              <div className="space-y-2 text-amber-100">
                <div>• Registration page with form validation</div>
                <div>• Login page with credential verification</div>
                <div>• Database integration using Prisma ORM</div>
                <div>• NextAuth.js authentication flow</div>
                <div>• Password hashing with bcrypt</div>
              </div>
            </div>
          </div>

          {/* Knowledge Gaps */}
          <div className="bg-black/40 rounded-2xl p-8 text-white backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-center text-amber-200">
              Knowledge Gaps
            </h2>
            <div className="space-y-4">
              {generatedData.keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="bg-black/20 rounded-lg p-6 hover:bg-black/30 transition-colors backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-orange-300 mb-2">
                        {index + 1}. {keyword.keyword}
                      </h3>
                      <div className="text-amber-100 mb-3">
                        {keyword.detail_text
                          .split("\n")
                          .map((line, lineIndex) => (
                            <div key={lineIndex} className="mb-1">
                              {line.includes("Gap:") && (
                                <span className="font-semibold text-amber-200">
                                  Gap:{" "}
                                </span>
                              )}
                              {line.includes("Study:") && (
                                <span className="font-semibold text-amber-200">
                                  Study:{" "}
                                </span>
                              )}
                              {line.replace(/^(Gap:|Study:)\s*/, "")}
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="ml-4 text-green-300">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          <div className="bg-black/40 rounded-2xl p-8 text-white text-center backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-amber-200">
              Are you ready to test your skills with a quiz?
            </h2>
            <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transition-colors">
              Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
