"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useSession } from "next-auth/react";

export default function Home() {
  const leftTypedRef = useRef<HTMLDivElement>(null);
  const rightTypedRef = useRef<HTMLDivElement>(null);
  const topLeftTypedRef = useRef<HTMLDivElement>(null);
  const bottomRightTypedRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    let leftTyped: Typed | null = null;
    let rightTyped: Typed | null = null;
    let topLeftTyped: Typed | null = null;
    let bottomRightTyped: Typed | null = null;

    if (leftTypedRef.current) {
      leftTyped = new Typed(leftTypedRef.current, {
        strings: [
          `const api = {
  generateSummary: () => "AI insights",
  createQuiz: () => "Learning test",
  trackProgress: () => "Growth metrics"
};`,
          `function learnToCode() {
  return "Every session = New skills";
}`,
          `const skills = ["React", "Node.js", "AI"];`,
          `if (coding) { learn(); }`,
          `console.log("🚀 CodeCoach!");`,
        ],
        typeSpeed: 25,
        backSpeed: 15,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: "|",         // tecken
        autoInsertCss: true,
      });
    }

    if (rightTypedRef.current) {
      rightTyped = new Typed(rightTypedRef.current, {
        strings: [
          `// AI Learning Engine
const analyze = (code) => ({
  insights: "Personalized feedback",
  gaps: "Areas to improve",
  quiz: "Test understanding"
});`,
          `const progress = {
  today: "New concepts learned",
  week: "Skills improved",
  month: "Mastery achieved"
};`,
          `async function uploadSession(file) {
  return await processCode(file);
}`,
          `const learning = true;`,
          `// Transform coding into learning`,
        ],
        typeSpeed: 28,
        backSpeed: 18,
        backDelay: 1800,
        loop: true,
        showCursor: true,
        cursorChar: "_",
        autoInsertCss: true,
      });
    }

    if (topLeftTypedRef.current) {
      topLeftTyped = new Typed(topLeftTypedRef.current, {
        strings: [
          `// React Components
const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  return (
    <div className="dashboard">
      <SessionList sessions={sessions} />
    </div>
  );
};`,
          `const api = {
  upload: async (file) => "Processing...",
  generate: () => "AI analysis",
  quiz: () => "Learning test"
};`,
          `function CodeCoach() {
  return "Transform coding into learning";
}`,
          `const learning = { active: true };`,
        ],
        typeSpeed: 22,
        backSpeed: 12,
        backDelay: 1200,
        loop: true,
        showCursor: true,
        cursorChar: "_",
        autoInsertCss: true,
      });
    }

    if (bottomRightTypedRef.current) {
      bottomRightTyped = new Typed(bottomRightTypedRef.current, {
        strings: [
          `// Database Models
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  sessions DailySession[]
}

model DailySession {
  id       Int    @id @default(autoincrement())
  summary  String
  quiz     Quiz[]
}`,
          `// API Endpoints
app.post('/upload', uploadHandler);
app.get('/summary/:id', summaryHandler);
app.post('/quiz', quizHandler);`,
          `const ai = {
  analyze: (code) => "Insights",
  generate: () => "Quiz questions"
};`,
          `// Learning Journey
const progress = trackLearning();`,
        ],
        typeSpeed: 26,
        backSpeed: 14,
        backDelay: 1400,
        loop: true,
        showCursor: true,
        cursorChar: "|",
        autoInsertCss: true,
      });
    }

    return () => {
      leftTyped?.destroy();
      rightTyped?.destroy();
      topLeftTyped?.destroy();
      bottomRightTyped?.destroy();
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(150deg, #EEA553 0%, #E37503 20%, #D85C02 45%, #901801 70%, #000000 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style jsx global>{`
        .typed-target.tl + .typed-cursor { color: #FFC35B; }   /* top-left */
        .typed-target.br + .typed-cursor { color: #DD7C11; }   /* bottom-right */
        .typed-target.left + .typed-cursor { color: #DD7C11; } /* left */
        .typed-target.right + .typed-cursor { color: #DD7C11; }/* right */
      `}</style>

      {/* Top Left Animation */}
      <div className="absolute top-20 left-6 w-80 max-h-[300px] overflow-hidden">
        <div
          ref={topLeftTypedRef}
          className="typed-target tl font-mono text-xs leading-relaxed text-[#FFF08B] p-4 opacity-30"
          style={{
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        />
      </div>

      {/* Bottom Right Animation */}
      <div className="absolute bottom-6 right-6 w-80 max-h-[300px] overflow-hidden">
        <div
          ref={bottomRightTypedRef}
          className="typed-target br font-mono text-xs leading-relaxed text-[#FFF08B] p-4 opacity-30"
          style={{
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        />
      </div>

      {/* Left side animation */}
      <div className="absolute left-6 top-1/2 translate-y-16 hidden lg:block w-80 max-h-[400px] overflow-hidden">
        <div
          ref={leftTypedRef}
          className="typed-target left font-mono text-xs leading-relaxed text-[#FFF08B] p-4 opacity-30"
          style={{
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        />
      </div>

      <div className="flex items-start justify-center gap-10 px-6 pt-20 pb-20">
        {/* --- Center: Main content --- */}
        <div className="text-center space-y-10">
          <h2 className="font-orbitron text-4xl md:text-5xl font-semibold text-[#FFC35B] tracking-wider ">
            Welcome to
          </h2>

          <div className="space-y-6">
            <div className="mx-auto w-72 md:w-[520px] border-t border-[#FFF08B]" />
            <div className="font-orbitron text-6xl md:text-9xl font-extrabold tracking-[0.005em] text-[#FFC35B] text-stroke-yellow">
              <span>&lt;CODE/&gt;</span>
            </div>
            <div className="font-orbitron text-6xl md:text-9xl font-extrabold tracking-[0.005em] text-[#FFC35B] text-stroke-yellow">
              COACH
            </div>
            <div className="mx-auto w-72 md:w-[520px] border-t border-[#FFF08B]" />
          </div>

          <p className="font-michroma max-w-2xl mx-auto text-[#FFF08B] text-base md:text-lg leading-relaxed">
            A learning platform that transforms everyday coding
            <br />
            with AI assistants into a personalized learning journey
          </p>

          <div>
            <Link
              href={session ? "/codecoach" : "/login"}
              className="inline-block rounded-full bg-[#174914] px-10 py-3 text-[#FFC44D] hover:opacity-90 transition font-michroma tracking-wide"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </div>

      {/* Right side animation */}
      <div className="absolute right-6 top-1/2 -translate-y-16 hidden lg:block w-80 max-h-[400px] overflow-hidden">
        <div
          ref={rightTypedRef}
          className="typed-target right font-mono text-xs leading-relaxed text-[#FFF08B] p-4 opacity-30"
          style={{
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        />
      </div>
    </div>
  );
}
