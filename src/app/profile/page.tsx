"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProgressRing from "../components/ProgressRing";
import LearningsChart from "../components/LearningsChart";
import { Michroma } from "next/font/google";

interface QuizResult {
  id: number;
  score: number;
  percentage: number;
  total_questions: number;
  completed_at: string;
  daily_session: { date: string };
}

interface User {
  id: number;
  initials: string;
  name: string;
  role: string;
  email: string;
  profession: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Popover under the button (no backdrop, toggled by the button)
  const [showOverview, setShowOverview] = useState(false);
  const [anchor, setAnchor] = useState<{ top: number; left: number } | null>(
    null
  );
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Fetch user data
        const userRes = await fetch("/api/user", { credentials: "include" });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData.user);
        }

        // Fetch quiz results
        const quizRes = await fetch("/api/quiz-results", {
          credentials: "include",
        });
        if (quizRes.ok) {
          const quizData = await quizRes.json();
          setQuizResults(quizData.results || []);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Lock body scroll while popover is open (keeps it static)
  useEffect(() => {
    if (!showOverview) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showOverview]);

  // Position just under the button (viewport coords – no scrollY!)
  const toggleOverview = () => {
    if (showOverview) {
      setShowOverview(false);
      return;
    }
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      setAnchor({
        top: r.bottom + 8, // 8px under knappen
        left: r.left + r.width / 2, // centrerad mot knappen
      });
    }
    setShowOverview(true);
  };

  // ----- rings data
  const formatQuizData = (results: QuizResult[]) =>
    results.map((r) => {
      const d = new Date(r.completed_at);
      const today = new Date();
      const label =
        d.toDateString() === today.toDateString()
          ? "TODAY"
          : `${d.getDate()}/${d.getMonth() + 1}`;
      return { label, percent: Math.round(r.percentage) };
    });

  const mockQuizzes = [
    { label: "TODAY", percent: 60 },
    { label: "1/10", percent: 37 },
    { label: "30/9", percent: 53 },
    { label: "29/9", percent: 96 },
    { label: "27/9", percent: 78 },
  ];
  const quizzes =
    quizResults.length > 0 ? formatQuizData(quizResults) : mockQuizzes;

  // ----- hard-coded calendar visuals (Oct 2025)
  const calendarCells: (number | null)[] = useMemo(
    () => [
      null,
      null,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      null,
      null,
      null,
      null,
    ],
    []
  );

  const greenDays = new Set([2, 3, 8, 9, 10, 14, 15, 17, 19, 21, 22, 28]);
  const yellowDays = new Set([7, 16, 23, 25, 29]);
  const redDays = new Set([1, 6, 24, 27]);

  const ringClass = (day: number) =>
    greenDays.has(day)
      ? "ring-2 ring-[#64E850]"
      : yellowDays.has(day)
      ? "ring-2 ring-[#FFF944]"
      : redDays.has(day)
      ? "ring-2 ring-[#EC4220]"
      : "";

  return (
    <div className="min-h-screen w-full flex flex-col items-center text-amber-200">
      {/* Profile */}
      <div className="mt-40 w-full max-w-3xl rounded-xl border border-amber-300/40 p-6 md:p-8 bg-black/10">
        {loading ? (
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#174914] flex items-center justify-center text-[#FFF08B] font-orbitron text-3xl">
              ...
            </div>
            <div className="space-y-2">
              <p className="font-michroma text-xl">Loading...</p>
              <p className="font-michroma text-base text-amber-200/90">
                Loading...
              </p>
              <p className="font-michroma text-base text-amber-200/90">
                Loading...
              </p>
            </div>
          </div>
        ) : user ? (
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
        ) : (
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#174914] flex items-center justify-center text-[#FFF08B] font-orbitron text-3xl">
              ?
            </div>
            <div className="space-y-2">
              <p className="font-michroma text-xl">User not found</p>
              <p className="font-michroma text-base text-amber-200/90">
                Please log in again
              </p>
              <p className="font-michroma text-base text-amber-200/90">-</p>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="mt-20 text-center">
        <p className="font-michroma text-4xl">QUIZZES</p>
      </div>

      {/* Overview button */}
      <div className="mt-4">
        <button
          ref={buttonRef}
          onClick={toggleOverview}
          className="inline-flex items-center gap-2 rounded-full border border-amber-200
                     text-[#FFF9B6] px-6 py-2 font-michroma text-sm mt-4"
          aria-haspopup="dialog"
          aria-expanded={showOverview}
        >
          OVERVIEW <span className="inline-block align-middle">▾</span>
        </button>
      </div>

      {/* Rings */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
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

      {/* ------ POPUP UNDER BUTTON (FIXED, NO BACKDROP, NO SCROLL) ------ */}
      {showOverview && anchor && (
        <div className="fixed inset-0 z-[10000] pointer-events-none">
          <div
            className="absolute pointer-events-auto"
            style={{
              top: anchor.top, // viewport px
              left: anchor.left,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="rounded-3xl shadow-2xl p-5 w-[28rem] max-w-[90vw]"
              style={{
                backgroundColor: "#FFCA60",
                opacity: 0.95,
                color: "#2b2b2b",
                borderRadius: 24,
              }}
            >
              {/* header */}
              <div className="flex items-center justify-between mb-3">
                <button
                  className="text-lg px-2 py-1 rounded-full hover:bg-black/5"
                  aria-label="Prev month"
                >
                  ‹
                </button>
                <p className="font-michroma tracking-wider text-lg font-bold leading-none text-[#174914]">
                  OCTOBER 2025
                </p>
                <button
                  className="text-lg px-2 py-1 rounded-full hover:bg-black/5"
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>

              {/* weekdays */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "12px",
                  textAlign: "center",
                }}
                className="mb-1"
              >
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
                  <div
                    key={d}
                    className="text-[11px] mb-1 font-michroma font-bold text-[#174914] leading-none"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* days */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "12px",
                  textAlign: "center",
                }}
              >
                {calendarCells.map((cell, i) => {
                  if (cell === null) return <div key={`b-${i}`} />;
                  const ring =
                    (greenDays.has(cell) && "ring-2 ring-[#64E850]") ||
                    (yellowDays.has(cell) && "ring-2 ring-[#FFF944]") ||
                    (redDays.has(cell) && "ring-2 ring-[#EC4220]") ||
                    "";
                  return (
                    <div
                      key={`d-${cell}`}
                      className="flex items-center justify-center"
                    >
                      <div
                        className={`rounded-full font-michroma text-[#174914] flex items-center justify-center text-[11px] font-semibold leading-none ${ring}`}
                        style={{ width: 28, height: 28 }}
                      >
                        {cell}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learnings Chart Component */}
      <LearningsChart />
    </div>
  );
}
