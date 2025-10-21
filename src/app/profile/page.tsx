"use client";

import { useEffect, useState } from "react";
import ProgressRing from "../components/ProgressRing";

interface QuizResult {
  id: number;
  score: number;
  percentage: number;
  total_questions: number;
  completed_at: string;
  daily_session: {
    date: string;
  };
}

export default function ProfilePage() {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock user data (you can later fetch this from user profile API)
  const user = {
    initials: "CK",
    name: "Cornelia Kärnekull",
    role: "Student",
    email: "karnekull.cornelia@gmail.com",
  };

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await fetch("/api/quiz-results", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setQuizResults(data.results || []);
        } else {
          console.error("Failed to fetch quiz results");
        }
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, []);

  // Format quiz results for display
  const formatQuizData = (results: QuizResult[]) => {
    return results.map((result, index) => {
      const date = new Date(result.completed_at);
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();

      let label: string;
      if (isToday) {
        label = "TODAY";
      } else {
        label = `${date.getDate()}/${date.getMonth() + 1}`;
      }

      return {
        label,
        percent: Math.round(result.percentage),
      };
    });
  };

  // Mock data for when no quiz results exist
  const mockQuizzes = [
    { label: "TODAY", percent: 60 },
    { label: "1/10", percent: 37 },
    { label: "30/9", percent: 53 },
    { label: "29/9", percent: 96 },
    { label: "27/9", percent: 78 },
  ];

  const quizzes =
    quizResults.length > 0 ? formatQuizData(quizResults) : mockQuizzes;

  return (
    <div className="min-h-screen w-full flex flex-col items-center text-amber-200">
      {/* Card */}
      <div className="mt-40 w-full max-w-3xl rounded-xl border border-amber-300/40 p-6 md:p-8 bg-black/10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#174914] flex items-center justify-center text-[#FFF08B] font-orbitron text-3xl">
            {user.initials}
          </div>
          <div className="space-y-2">
            <p className="font-michroma text-xl">{user.name}</p>
            <p className="font-michroma text-base text-amber-200/90">
              {user.role}
            </p>
            <p className="font-michroma text-base text-amber-200/90">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-20 text-center">
        <p className="font-michroma text-4xl">QUIZZES</p>
      </div>

      {/* Rings */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
        {loading ? (
          <div className="text-center">
            <p className="font-michroma text-amber-200/90">
              Loading quiz results...
            </p>
          </div>
        ) : (
          quizzes.map((q, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3">
              <span className="font-michroma text-sm text-amber-200/90">
                {q.label}
              </span>
              <ProgressRing
                size={120}
                strokeWidth={12}
                percent={q.percent}
                trackColor="#E2C3A3"
                delayMs={1000}
                autoColor={true}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
