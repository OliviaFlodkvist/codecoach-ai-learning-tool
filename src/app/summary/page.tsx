"use client";

import GapItem from "@/app/components/GapItem";
import { Anek_Gurmukhi } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const anek = Anek_Gurmukhi({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface GeneratedData {
  summary: {
    what_you_built: string[];
    knowledge_gaps: {
      title: string;
      intro: string;
      gap: string;
      study: string;
      concepts: string;
    }[];
  };
  quiz: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

export default function SummaryPage() {
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skipOpenAI, setSkipOpenAI] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  // Debug sessionId
  console.log("Summary page - sessionId from URL:", sessionId);

  useEffect(() => {
    // First, check the config to see if we should skip OpenAI
    const checkConfig = async () => {
      try {
        const configResponse = await fetch("/api/config");
        const config = await configResponse.json();
        setSkipOpenAI(config.skipOpenAI);
      } catch (error) {
        console.error("Failed to fetch config:", error);
        setSkipOpenAI(false); // Default to not skipping
      }
    };

    checkConfig();
  }, []);

  useEffect(() => {
    if (sessionId && skipOpenAI !== null) {
      fetchSummaryData(sessionId);
    } else if (!sessionId) {
      // Use mock data if no sessionId
      setGeneratedData({
        summary: {
          what_you_built: [
            "- Registration page with form validation",
            "- Login page with credential verification",
            "- Database integration using Prisma ORM",
            "- NextAuth.js authentication flow",
            "- Password hashing with bcrypt",
          ],
          knowledge_gaps: [
            {
              title: "1. Data Flow Understanding",
              intro: "Understanding how data flows from UI to database",
              gap: "Not tracking how data transforms from UI → API → Database",
              study: "Request/response lifecycle, payload mapping",
              concepts:
                "When a user fills out a form, the frontend temporarily stores the data (e.g., in React state). When the form is submitted, this data is sent as an HTTP request to the backend. The backend parses and validates the data, then processes it—often by interacting with the database to create or update records. Once processing is complete, the backend sends a response back to the frontend, indicating success or failure and sometimes returning the processed data. Understanding this lifecycle helps pinpoint where issues like missing or incorrect data occur.",
            },
            {
              title: "2. Module System",
              intro: "How npm packages and modules work in Node.js",
              gap: "How npm packages work, node_modules, dependency resolution",
              study: "CommonJS vs ES Modules, package.json dependencies",
              concepts:
                "The module system in Node.js allows you to organize code into reusable pieces. npm packages are installed into node_modules and can be imported using require() or import statements. Understanding the difference between CommonJS (require/module.exports) and ES Modules (import/export) is crucial for avoiding import errors and ensuring proper dependency management.",
            },
            {
              title: "3. Async/Await Pattern",
              intro: "Asynchronous programming with promises and async/await",
              gap: "JavaScript event loop, promise chains",
              study: "JavaScript event loop, promise chains",
              concepts:
                "Async/await is syntactic sugar over promises that makes asynchronous code look synchronous. The JavaScript event loop handles the execution of code, managing the call stack, callback queue, and microtask queue. Understanding how promises work under the hood and how the event loop processes them is essential for writing efficient asynchronous code.",
            },
            {
              title: "4. TypeScript Basics",
              intro: "Type safety and static typing in JavaScript",
              gap: "Type inference, interfaces, generics",
              study: "Type inference, interfaces, generics",
              concepts:
                "TypeScript adds static type checking to JavaScript, helping catch errors at compile time. Type inference allows TypeScript to automatically determine types based on usage, while interfaces define contracts for object shapes. Generics provide a way to create reusable components that work with multiple types while maintaining type safety.",
            },
            {
              title: "5. CSS Layout (Tailwind)",
              intro: "CSS Box Model and layout fundamentals",
              gap: "CSS Box Model, flex/grid context",
              study:
                "How percentage widths are calculated relative to parent containers",
              concepts:
                "The CSS Box Model consists of content, padding, border, and margin. Understanding how these properties interact and how percentage widths are calculated relative to parent containers is crucial for creating responsive layouts. Flexbox and Grid provide powerful layout capabilities, but understanding their context and behavior is key to avoiding layout issues.",
            },
          ],
        },
        quiz: [],
      });
      setLoading(false);
    }
  }, [sessionId, skipOpenAI]);

  const fetchSummaryData = async (sessionId: string) => {
    try {
      // First, get the current config to make sure we have the latest setting
      const configResponse = await fetch("/api/config");
      const config = await configResponse.json();
      const shouldSkipOpenAI = config.skipOpenAI;

      // Use the config value to determine what to do
      if (shouldSkipOpenAI) {
        // Use mock data directly - no API call needed
        const mockData: GeneratedData = {
          summary: {
            what_you_built: [
              "- Registration page with form validation",
              "- Login page with credential verification",
              "- Database integration using Prisma ORM",
              "- NextAuth.js authentication flow",
              "- Password hashing with bcrypt",
            ],
            knowledge_gaps: [
              {
                title: "1. Data Flow Understanding",
                intro: "Understanding how data flows from UI to database",
                gap: "Not tracking how data transforms from UI → API → Database",
                study: "Request/response lifecycle, payload mapping",
                concepts:
                  "When a user fills out a form, the frontend temporarily stores the data (e.g., in React state). When the form is submitted, this data is sent as an HTTP request to the backend. The backend parses and validates the data, then processes it—often by interacting with the database to create or update records. Once processing is complete, the backend sends a response back to the frontend, indicating success or failure and sometimes returning the processed data. Understanding this lifecycle helps pinpoint where issues like missing or incorrect data occur.",
              },
              {
                title: "2. Module System",
                intro: "How npm packages and modules work in Node.js",
                gap: "How npm packages work, node_modules, dependency resolution",
                study: "CommonJS vs ES Modules, package.json dependencies",
                concepts:
                  "The module system in Node.js allows you to organize code into reusable pieces. npm packages are installed into node_modules and can be imported using require() or import statements. Understanding the difference between CommonJS (require/module.exports) and ES Modules (import/export) is crucial for avoiding import errors and ensuring proper dependency management.",
              },
              {
                title: "3. Async/Await Pattern",
                intro: "Asynchronous programming with promises and async/await",
                gap: "JavaScript event loop, promise chains",
                study: "JavaScript event loop, promise chains",
                concepts:
                  "Async/await is syntactic sugar over promises that makes asynchronous code look synchronous. The JavaScript event loop handles the execution of code, managing the call stack, callback queue, and microtask queue. Understanding how promises work under the hood and how the event loop processes them is essential for writing efficient asynchronous code.",
              },
              {
                title: "4. TypeScript Basics",
                intro: "Type safety and static typing in JavaScript",
                gap: "Type inference, interfaces, generics",
                study: "Type inference, interfaces, generics",
                concepts:
                  "TypeScript adds static type checking to JavaScript, helping catch errors at compile time. Type inference allows TypeScript to automatically determine types based on usage, while interfaces define contracts for object shapes. Generics provide a way to create reusable components that work with multiple types while maintaining type safety.",
              },
              {
                title: "5. CSS Layout (Tailwind)",
                intro: "CSS Box Model and layout fundamentals",
                gap: "CSS Box Model, flex/grid context",
                study:
                  "How percentage widths are calculated relative to parent containers",
                concepts:
                  "The CSS Box Model consists of content, padding, border, and margin. Understanding how these properties interact and how percentage widths are calculated relative to parent containers is crucial for creating responsive layouts. Flexbox and Grid provide powerful layout capabilities, but understanding their context and behavior is key to avoiding layout issues.",
              },
            ],
          },
          quiz: [
            {
              question: "What is the purpose of NextAuth.js in authentication?",
              options: [
                "Database management",
                "Handles authentication flows and session management",
                "CSS styling",
              ],
              answer: "B",
            },
            {
              question: "Which Prisma method is used to find a unique record?",
              options: ["findFirst", "findUnique", "findMany"],
              answer: "B",
            },
            {
              question: "What does bcryptjs do?",
              options: [
                "Validates forms",
                "Hashes passwords securely",
                "Creates databases",
              ],
              answer: "B",
            },
            {
              question:
                "In Next.js, what is the purpose of 'use client' directive?",
              options: [
                "Server-side rendering",
                "Makes a component run on the client side",
                "Database queries",
              ],
              answer: "B",
            },
            {
              question: "What is the main benefit of using TypeScript?",
              options: [
                "Faster execution",
                "Type safety and better developer experience",
                "Smaller bundle size",
              ],
              answer: "B",
            },
          ],
        };

        setGeneratedData(mockData);
      } else {
        // Use real API for actual data
        const response = await fetch(`/api/summary?sessionId=${sessionId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch summary data");
        }
        const data = await response.json();

        // Transform old format to new format
        const transformedData: GeneratedData = {
          summary: {
            what_you_built: data.summary
              ? data.summary.split("\n").filter((line: string) => line.trim())
              : [],
            knowledge_gaps: data.keywords
              ? data.keywords.map((k: any, index: number) => {
                  // Parse the detail_text to extract gap and study info
                  const lines = k.detail_text.split("\n");
                  const intro = lines[0] || "";
                  const gapLine = lines.find((line: string) =>
                    line.startsWith("Gap: ")
                  );
                  const studyLine = lines.find((line: string) =>
                    line.startsWith("Study: ")
                  );
                  const conceptsStart = lines.findIndex((line: string) =>
                    line.startsWith("Concepts:")
                  );
                  const concepts =
                    conceptsStart >= 0
                      ? lines.slice(conceptsStart + 1).join("\n")
                      : "";

                  return {
                    title: `${index + 1}. ${k.keyword}`,
                    intro: intro,
                    gap: gapLine ? gapLine.replace("Gap: ", "") : "",
                    study: studyLine ? studyLine.replace("Study: ", "") : "",
                    concepts: concepts,
                  };
                })
              : [],
          },
          quiz: data.quiz
            ? data.quiz.map((q: any) => ({
                question: q.question_text,
                options: q.options || [],
                answer: q.answer,
              }))
            : [],
        };

        setGeneratedData(transformedData);
      }
    } catch (error) {
      console.error("Error fetching summary data:", error);
      setError("Failed to load summary data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full pt-6 text-amber-200">
        <div className="min-h-[15vh] flex justify-center items-center w-full text-center">
          <p className="font-michroma lg:text-5xl text-3xl font-bold">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error || !generatedData) {
    return (
      <div className="flex flex-col w-full pt-6 text-amber-200">
        <div className="min-h-[15vh] flex justify-center items-center w-full text-center">
          <p className="font-michroma lg:text-5xl text-3xl font-bold">
            Error: {error}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full pt-6 text-amber-200">
      {/* Title */}
      <div className="min-h-[15vh] flex justify-center items-center w-full text-center">
        <p className="font-michroma lg:text-5xl text-3xl font-bold">
          Today&apos;s Summary
        </p>
      </div>

      {/* Development Mode Indicator */}
      {skipOpenAI === true && (
        <div className="mb-4 text-center">
          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
            🚧 DEVELOPMENT MODE - Using Mock Data
          </span>
        </div>
      )}

      {/* Summary of today*/}
      <div className="w-full max-w-[80%] md:max-w-[70%] mx-auto px-6 md:px-10">
        <div className="text-left space-y-5">
          <p className="font-michroma text-2xl md:text-3xl font-bold">
            What you have built:
          </p>

          <div className={anek.className}>
            <ul className="list-disc pl-6 text-base leading-relaxed mt-4">
              {generatedData.summary.what_you_built.map((item, index) => (
                <li key={index}>{item.replace(/^- /, "")}</li>
              ))}
            </ul>
          </div>
          {/* Dropdown keywords*/}
          <p className="font-michroma text-2xl md:text-3xl font-bold mt-15">
            Knowledge Gaps:
          </p>

          <div className="mt-3 space-y-3">
            {generatedData.summary.knowledge_gaps.map((gap, index) => {
              const colors = [
                "text-[#FF9D00]",
                "text-[#FFFB00]",
                "text-[#BFFF00]",
                "text-[#58EC4B]",
                "text-[#1CEF8D]",
              ];
              const color = colors[index] || "text-[#FF9D00]";

              return (
                <GapItem
                  key={index}
                  number={`${index + 1}.`}
                  title={gap.title}
                  titleClassName={color}
                  preview={
                    <>
                      <p className="ml-4">{gap.intro}</p>
                      <p className="ml-4">
                        <strong>Gap:</strong> {gap.gap}
                      </p>
                      <p className="ml-4">
                        <strong>Study:</strong> {gap.study}
                      </p>
                    </>
                  }
                >
                  <div className={`${color} ml-4 mt-4`}>
                    <p className="font-bold">Concepts</p>
                    <p className="ml-0 mb-6">{gap.concepts}</p>
                  </div>
                </GapItem>
              );
            })}
          </div>
        </div>
      </div>
      <div className="min-h-[20vh] w-full flex flex-col items-center justify-center text-center gap-8">
        <p className="font-michroma lg:text-4xl text-2xl font-bold mb-4">
          Are you ready to test your skills with a quiz?
        </p>

        <Link
          href={sessionId ? `/quiz?sessionId=${sessionId}` : "/quiz"}
          className="inline-flex items-center justify-center px-10 py-6 md:px-12 md:py-4
                rounded-full bg-[#174914] text-[#FFF9B6] font-michroma text-3xl"
          onClick={() => {
            console.log("Quiz button clicked, sessionId:", sessionId);
            console.log(
              "Quiz URL will be:",
              sessionId ? `/quiz?sessionId=${sessionId}` : "/quiz"
            );
          }}
        >
          Quiz
        </Link>
      </div>
    </div>
  );
}
