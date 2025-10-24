"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProgressRing from "../components/ProgressRing";

const stripPrefix = (s: string) =>
  s.replace(/^\s*(([A-Za-z])\s*[.)]|(\d+)\s*[.)])\s*/, "").trim();

type Question = {
  question: string;
  type: "multiple_choice";
  options: string[]; // raw option text, utan "A. "/ "B. " prefix
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
  const isRedo = searchParams.get("redo") === "true";

  useEffect(() => {
    if (sessionId) {
      fetchQuizData(sessionId);
    } else {
      fetchMostRecentSession();
    }
  }, [sessionId]);

  const fetchMostRecentSession = async () => {
    try {
      const response = await fetch("/api/sessions");
      if (!response.ok) throw new Error("Failed to fetch sessions");
      const sessions = await response.json();
      if (sessions.length > 0) {
        const mostRecentSession = sessions[0];
        fetchQuizData(mostRecentSession.id.toString());
      } else {
        fetchAvailableSessions();
      }
    } catch {
      fetchAvailableSessions();
    }
  };

  const fetchAvailableSessions = async () => {
    try {
      const response = await fetch("/api/sessions");
      if (!response.ok) throw new Error("Failed to fetch available sessions");
      const sessions = await response.json();
      setAvailableSessions(sessions);
      setLoading(false);
    } catch {
      setError("Failed to load available sessions");
      setLoading(false);
    }
  };

  const fetchQuizData = async (sessionIdToUse: string) => {
    try {
      setCurrentSessionId(sessionIdToUse);

      const configResponse = await fetch("/api/config");
      const config = await configResponse.json();
      const shouldSkipOpenAI = config.skipOpenAI;

      let data: any;
      if (shouldSkipOpenAI) {
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
        const response = await fetch(
          `/api/summary?sessionId=${sessionIdToUse}`
        );
        if (!response.ok) throw new Error("Failed to fetch quiz data");
        data = await response.json();
      }

      const transformedData: QuizData = {
        quiz: data.quiz
          ? data.quiz.map((q: any) => ({
              question: q.question_text,
              type: "multiple_choice" as const,
              options: (q.options ?? []).map((opt: string) => stripPrefix(opt)),
              answer: q.answer as "A" | "B" | "C",
            }))
          : [],
      };

      if (transformedData.quiz.length === 0) {
        setError(
          "No quiz questions found for this session. The session might not have generated quiz questions yet."
        );
        setLoading(false);
        return;
      }

      setQuizData(transformedData);
    } catch {
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

  // Visa session-väljare om ingen sessionId finns
  if (!sessionId && !loading && availableSessions.length > 0) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center text-center text-yellow-200 font-michroma">
        <div className="flex flex-col gap-8 max-w-2xl px-6">
          <div className="text-6xl">QUIZ</div>
          <div className="text-xl">Select a session to take the quiz:</div>
          <div className="flex flex-col gap-4">
            {availableSessions.map((session) => (
              <Link
                key={session.id}
                href={`/quiz?sessionId=${session.id}`}
                className="border border-yellow-200 rounded-xl bg-yellow-400/20 text-yellow-200 px-6 py-4 hover:bg-yellow-400/40 transition-colors"
              >
                Session {session.id} –{" "}
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
      <div className="min-h-screen w-full flex justify-center items-center text-center text-yellow-200 font-michroma">
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
    if (selectedIdx !== null) return; // lås svaret
    setSelectedIdx(idx);

    // Räkna ut bokstav från index istället för att läsa ur texten
    const chosenLetter = String.fromCharCode(65 + idx) as "A" | "B" | "C";
    if (chosenLetter === q.answer) setScore((s) => s + 1);

    setUserAnswers((prev) => [...prev, chosenLetter]);
    if (chosenLetter === q.answer) {
      setCorrectAnswers((prev) => [...prev, current + 1]);
    }
  };

  const saveQuizResult = async () => {
    if (!currentSessionId || !quizData) return;
    try {
      const percentage = (score / quizData.quiz.length) * 100;
      const response = await fetch("/api/quiz-results", {
        method: isRedo ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: parseInt(currentSessionId),
          score,
          percentage,
          totalQuestions: quizData.quiz.length,
          correctAnswers,
          userAnswers,
        }),
      });
      if (!response.ok) throw new Error();
      await response.json();
    } catch {
      // ignorerar fel – påverkar inte quizflödet
    }
  };

  const handleNext = () => {
    if (selectedIdx === null) return; // säkerhet
    if (current < quizData.quiz.length - 1) {
      setCurrent((c) => c + 1);
      setSelectedIdx(null);
    } else {
      setDone(true);
      setTimeout(saveQuizResult, 100);
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
    <div className="min-h-screen w-full flex justify-center items-center text-yellow-200 font-michroma px-4">
      <div className="flex flex-col gap-12 max-w-3xl w-full">
        {!done ? (
          <>
            {/* Frågan – smalare bredd och snygg radbrytning */}
            <div className="text-3xl md:text-2xl leading-snug text-center mx-auto max-w-4xl text-balance">
              {q.question}
            </div>

            {/* Alternativ */}
            <div className="flex flex-col gap-4 items-center">
              {q.options.map((opt, idx) => {
                const chosen = selectedIdx === idx;
                const correctLetter = q.answer.charCodeAt(0) - 65; // 0/1/2
                const isCorrect = idx === correctLetter;

                // När något valts: visa GRÖN på rätt, RÖD på valt fel, och halvgenomskinlig på övriga
                let stateBg = "bg-yellow-200/20";
                if (selectedIdx !== null) {
                  if (isCorrect) stateBg = "bg-green-600";
                  if (chosen && !isCorrect) stateBg = "bg-red-600";
                }

                // Label ”A. ”, ”B. ”, ”C. ” renderas här – inte i datat
                const letter = String.fromCharCode(65 + idx);

                return (
                  <button
                    key={`${letter}-${opt}`}
                    className={`border border-yellow-200 rounded-xl ${stateBg} text-yellow-100 w-full max-w-2xl px-6 py-4 text-center whitespace-normal break-words cursor-pointer`}
                    onClick={() => handleChoose(idx)}
                    disabled={selectedIdx !== null}
                  >
                    <span className="text-lg md:text-xl">
                      {letter}. {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Next endast när valt */}
            <div className="flex justify-center">
              {selectedIdx !== null && (
                <button
                  className="rounded-xl font-semibold bg-yellow-600 text-yellow-50 w-64 h-12 cursor-pointer border border-yellow-300"
                  onClick={handleNext}
                >
                  next
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-5xl text-[#FFF08B] mt-8 text-center">
              RESULTS
            </div>
            <div className="text-xl text-[#FFF08B] -mt-2 text-center">
              {isRedo ? "UPDATED SCORE" : "TODAYS SCORE"}
            </div>

            <div className="flex justify-center">
              <ProgressRing
                size={180}
                strokeWidth={12}
                percent={(score / quizData.quiz.length) * 100}
                trackColor="#E2C3A3"
                delayMs={1000}
                autoColor={true}
                lightText={true}
              />
            </div>

            <div className="text-xl text-[#FFF08B] mb-2 text-center">
              Correct Answers:
            </div>

            <div className="flex gap-6 justify-center">
              {Array.from({ length: quizData.quiz.length }, (_, i) => {
                const isCorrect = correctAnswers.includes(i + 1);
                return (
                  <div
                    key={i}
                    className={`text-2xl font-bold ${
                      isCorrect ? "text-[#59DD45]" : "text-[#EC4220]"
                    }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>

            <div className="text-center text-[#FFF08B]">
              Go to profile to see your learning journey
            </div>

            <div className="flex justify-center gap-4">
              <Link
                href="/profile"
                className="bg-[#174914] text-[#FFF08B] px-8 py-3 rounded-full hover:opacity-80 transition-opacity"
              >
                Go to Profile
              </Link>
              <button
                onClick={handleRestart}
                className="border border-yellow-300 text-yellow-200 px-6 py-3 rounded-full hover:bg-yellow-400/20 transition-colors"
              >
                Restart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
