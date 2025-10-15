"use client";
import React, { useState } from "react";

type Question = {
  question: string;
  type: "multiple_choice";
  options: string[]; // e.g. ["A. ...", "B. ...", "C. ..."]
  answer: "A" | "B" | "C";
};

const quiz: Question[] = [
  {
    question: "Why is bcrypt used instead of storing plain-text passwords?",
    type: "multiple_choice",
    options: [
      "A. It compresses passwords to save database space",
      "B. It transforms passwords into secure salted hashes that are hard to reverse",
      "C. It makes login requests faster",
    ],
    answer: "B",
  },
  {
    question:
      "Which PrismaClient method is best for checking if a user already exists during registration?",
    type: "multiple_choice",
    options: [
      "A. prisma.member.findUnique",
      "B. prisma.member.search",
      "C. prisma.member.lookupByEmail",
    ],
    answer: "A",
  },
  {
    question: "What does the authorize() function in NextAuth’s Credentials provider do?",
    type: "multiple_choice",
    options: [
      "A. It defines how to validate login credentials and returns a user object if valid",
      "B. It stores new users in the database",
      "C. It redirects users after login",
    ],
    answer: "A",
  },
  {
    question: "Which Tailwind classes center a registration form in the viewport?",
    type: "multiple_choice",
    options: [
      "A. flex items-center justify-center min-h-screen",
      "B. grid gap-4 justify-items-center",
      "C. block mx-auto mt-10",
    ],
    answer: "A",
  },
  {
    question:
      "Why is it important to run npx prisma migrate dev after changing schema.prisma?",
    type: "multiple_choice",
    options: [
      "A. It restarts the dev server automatically",
      "B. It applies schema changes to the database to keep it in sync with the code",
      "C. It installs dependencies for Prisma",
    ],
    answer: "B",
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = quiz[current];

  const handleChoose = (idx: number) => {
    if (selectedIdx !== null) return; // prevent changing answer
    setSelectedIdx(idx);

    const chosenLetter = q.options[idx][0] as "A" | "B" | "C";
    if (chosenLetter === q.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < quiz.length - 1) {
      setCurrent((c) => c + 1);
      setSelectedIdx(null);
    } else {
      setDone(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelectedIdx(null);
    setDone(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-500 via-orange-600 to-black flex justify-center items-center text-center text-yellow-200 font-orbitron">
      <div className="flex flex-col gap-16">
        <div className="font-normal text-8xl">QUIZ</div>

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

            <div>
              <button
                className="border border-yellow-200 rounded-xl bg-yellow-400 text-yellow-100 w-64 h-12 cursor-pointer"
                onClick={handleNext}
              >
                next
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="">You got {score} out of {quiz.length}.</div>
            <div>
              <button
                className="mt-6 border border-yellow-200 rounded-xl bg-yellow-400 text-yellow-100 w-64 h-12 cursor-pointer"
                onClick={handleRestart}
              >
                restart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}



