"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Question = {
  question: string;
  type: "multiple_choice";
  options: string[]; // e.g. ["A. ...", "B. ...", "C. ..."]
  answer: "A" | "B" | "C";
};

interface QuizData {
  quiz: Question[];
}

export default function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableSessions, setAvailableSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  useEffect(() => {
    console.log("Quiz page loaded with sessionId:", sessionId);
    console.log("Current URL:", window.location.href);
    if (sessionId) {
      console.log("SessionId found, starting quiz automatically...");
      // Automatically start the quiz for this session
      fetchQuizData(sessionId);
    } else {
      console.log(
        "No sessionId found, trying to get the most recent session..."
      );
      // Try to get the most recent session with quiz data
      fetchMostRecentSession();
    }
  }, [sessionId]);

  const fetchMostRecentSession = async () => {
    try {
      const response = await fetch("/api/sessions");
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      const sessions = await response.json();

      if (sessions.length > 0) {
        // Use the most recent session (first in the list since it's ordered by createdAt desc)
        const mostRecentSession = sessions[0];
        console.log("Using most recent session:", mostRecentSession.id);
        fetchQuizData(mostRecentSession.id.toString());
      } else {
        console.log("No sessions found, showing session selection...");
        fetchAvailableSessions();
      }
    } catch (error) {
      console.error("Error fetching most recent session:", error);
      fetchAvailableSessions();
    }
  };

  const fetchAvailableSessions = async () => {
    try {
      const response = await fetch("/api/sessions");
      if (!response.ok) {
        throw new Error("Failed to fetch available sessions");
      }
      const sessions = await response.json();
      setAvailableSessions(sessions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError("Failed to load available sessions");
      setLoading(false);
    }
  };

  const fetchQuizData = async (sessionIdToUse: string) => {
    try {
      // Store the sessionId that we're actually using
      setCurrentSessionId(sessionIdToUse);
      // First, check if we should skip OpenAI (same logic as summary page)
      const configResponse = await fetch("/api/config");
      const config = await configResponse.json();
      const shouldSkipOpenAI = config.skipOpenAI;

      let data;

      if (shouldSkipOpenAI) {
        // Use mock data directly - same as summary page
        data = {
          quiz: [
            {
              question_text:
                "What is the purpose of NextAuth.js in authentication?",
              options: [
                "Database management",
                "Handles authentication flows and session management",
                "CSS styling",
              ],
              answer: "B",
            },
            {
              question_text:
                "Which Prisma method is used to find a unique record?",
              options: ["findFirst", "findUnique", "findMany"],
              answer: "B",
            },
            {
              question_text: "What does bcryptjs do?",
              options: [
                "Validates forms",
                "Hashes passwords securely",
                "Creates databases",
              ],
              answer: "B",
            },
            {
              question_text:
                "In Next.js, what is the purpose of 'use client' directive?",
              options: [
                "Server-side rendering",
                "Makes a component run on the client side",
                "Database queries",
              ],
              answer: "B",
            },
            {
              question_text: "What is the main benefit of using TypeScript?",
              options: [
                "Faster execution",
                "Type safety and better developer experience",
                "Smaller bundle size",
              ],
              answer: "B",
            },
          ],
        };
      } else {
        // Fetch real data from database
        const response = await fetch(`/api/summary?sessionId=${sessionId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }
        data = await response.json();
      }

      console.log("Raw data:", data);
      console.log("Quiz data:", data.quiz);

      // Transform the data to match our quiz format
      const transformedData: QuizData = {
        quiz: data.quiz
          ? data.quiz.map((q: any) => {
            console.log("Processing quiz question:", q);
            return {
              question: q.question_text,
              type: "multiple_choice" as const,
              options: q.options
                ? q.options.map(
                  (option: string, index: number) =>
                    `${String.fromCharCode(65 + index)}. ${option}`
                )
                : [],
              answer: q.answer as "A" | "B" | "C",
            };
          })
          : [],
      };

      console.log("Transformed quiz data:", transformedData);

      // Check if we have quiz questions
      if (transformedData.quiz.length === 0) {
        setError(
          "No quiz questions found for this session. The session might not have generated quiz questions yet."
        );
        setLoading(false);
        return;
      }

      setQuizData(transformedData);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      setError("Failed to load quiz data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center text-center text-yellow-200 font-michroma">
        <div className="text-4xl">Loading Quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center text-center text-yellow-200 font-michroma">
        <div className="flex flex-col gap-4">
          <div className="text-2xl">Error: {error}</div>
          <Link
            href={
              currentSessionId
                ? `/summary?sessionId=${currentSessionId}`
                : "/summary"
            }
            className="text-yellow-200 hover:text-white"
          >
            ← Back to Summary
          </Link>
        </div>
      </div>
    );
  }

  // Show available sessions if no sessionId provided
  if (!sessionId && !loading && availableSessions.length > 0) {
    return (
      <div className="min-h-screen w-full to-black flex justify-center items-center text-center text-yellow-200 font-michroma">
        <div className="flex flex-col gap-8">
          <div className="text-6xl">QUIZ</div>
          <div className="text-xl">Select a session to take the quiz:</div>
          <div className="flex flex-col gap-4">
            {availableSessions.map((session) => (
              <Link
                key={session.id}
                href={`/quiz?sessionId=${session.id}`}
                className="border border-yellow-200 rounded-xl bg-yellow-400/20 text-yellow-200 px-6 py-4 hover:bg-yellow-400/40 transition-colors"
              >
                Session {session.id} -{" "}
                {new Date(session.date).toLocaleDateString()} (
                {session.quizCount} questions)
              </Link>
            ))}
          </div>
          <Link
            href={
              currentSessionId
                ? `/summary?sessionId=${currentSessionId}`
                : "/summary"
            }
            className="text-yellow-200 hover:text-white"
          >
            ← Back to Summary
          </Link>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen w-full to-black flex justify-center items-center text-center text-yellow-200 font-michroma">
        <div className="flex flex-col gap-4">
          <div className="text-2xl">No quiz data available</div>
          <Link
            href={
              currentSessionId
                ? `/summary?sessionId=${currentSessionId}`
                : "/summary"
            }
            className="text-yellow-200 hover:text-white"
          >
            ← Back to Summary
          </Link>
        </div>
      </div>
    );
  }

  const q = quizData.quiz[current];

  const handleChoose = (idx: number) => {
    if (selectedIdx !== null) return; // prevent changing answer
    setSelectedIdx(idx);

    const chosenLetter = q.options[idx][0] as "A" | "B" | "C";
    if (chosenLetter === q.answer) setScore((s) => s + 1);

    // Store user's answer
    const newUserAnswers = [...userAnswers, chosenLetter];
    setUserAnswers(newUserAnswers);

    // Track correct answers
    if (chosenLetter === q.answer) {
      setCorrectAnswers([...correctAnswers, current]);
    }
  };

  const saveQuizResult = async () => {
    if (!currentSessionId || !quizData) return;

    try {
      const percentage = (score / quizData.quiz.length) * 100;

      const response = await fetch("/api/quiz-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: parseInt(currentSessionId),
          score,
          percentage,
          totalQuestions: quizData.quiz.length,
          correctAnswers,
          userAnswers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save quiz result");
      }

      const result = await response.json();
      console.log("Quiz result saved:", result);
    } catch (error) {
      console.error("Error saving quiz result:", error);
      // Don't show error to user as this is not critical for the quiz experience
    }
  };

  const handleNext = () => {
    if (current < quizData.quiz.length - 1) {
      setCurrent((c) => c + 1);
      setSelectedIdx(null);
    } else {
      setDone(true);
      // Save the quiz result when completed
      setTimeout(() => {
        saveQuizResult();
      }, 100);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelectedIdx(null);
    setDone(false);
    setUserAnswers([]);
    setCorrectAnswers([]);
  };

  return (
    <div className="min-h-screen w-full to-black flex justify-center items-center text-center text-yellow-200 font-michroma">
      <div className="flex flex-col gap-16">
        <div className="font-michroma text-8xl">QUIZ</div>

        {!done ? (
          <>
            <div className="text-2xl">{q.question}</div>

            <div className="flex flex-col gap-4 text-center justify-center items-center">
              {q.options.map((opt, idx) => {
                const chosen = selectedIdx === idx;
                const isCorrect = opt[0] === q.answer;
                const stateBg =
                  selectedIdx === null
                    ? "bg-yellow-200/20"
                    : chosen
                      ? isCorrect
                        ? "bg-green-600"
                        : "bg-red-600"
                      : "bg-yellow-200/20";

                return (
                  <button
                    key={opt}
                    className={`border border-yellow-200 rounded-xl ${stateBg} text-yellow-100 w-124 h-16 cursor-pointer`}
                    onClick={() => handleChoose(idx)}
                    disabled={selectedIdx !== null}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 items-center">
              <button
                className="border border-yellow-200 rounded-xl font-semibold bg-yellow-600 text-white-400 w-64 h-12 cursor-pointer border border-yellow-300"
                onClick={handleNext}
              >
                next
              </button>
              <Link
                href={
                  currentSessionId
                    ? `/summary?sessionId=${currentSessionId}`
                    : "/summary"
                }
                className="text-yellow-200 hover:text-white"
              >
                ← Back to Summary
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="">

              <div className="text-2xl">You got</div>
              <div className="text-6xl font-michroma mt-12">
                {score} out of {quizData.quiz.length}
              </div>
            </div>

            {(() => {
                const percentage = (score / quizData.quiz.length) * 100;

                if (percentage > 80) {
                  return (
                    <div className="text-2xl font-michroma">
                      Excellent work!
                    </div>
                  );
                } else if (percentage >= 50) {
                  return (
                    <div className="text-2xl font-michroma">
                      Good work!
                    </div>
                  );
                } else {
                  return (
                    <div className="text-2xl font-michroma">
                      A bit more practice and you’ll nail it!
                    </div>
                  );
                }
              })()}


            <div className="flex flex-col gap-4 items-center">
              <Link
                href={
                  currentSessionId
                    ? `/summary?sessionId=${currentSessionId}`
                    : "/summary"
                }
                className="text-yellow-200 hover:text-white"
              >
                ← Back to Summary
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
