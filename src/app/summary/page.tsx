import GapItem from "@/app/components/GapItem";
import { Anek_Gurmukhi } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const anek = Anek_Gurmukhi({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function SummaryPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col text-amber-200">
    {/* Background image */}
    <Image
      src="/bg/summary_bg.png" 
      alt=""
      fill
      priority
      sizes="100vw"
      className="-z-10 object-cover"
    />
    <div className="flex flex-col w-full pt-6 text-amber-200">
      {/* Title */}
      <div className="min-h-[15vh] flex justify-center items-center w-full text-center">
        <p className="font-michroma lg:text-5xl text-3xl font-bold">
          Today&apos;s Summary
        </p>
      </div>

      {/* Summary of today*/}
      <div className="w-full max-w-[80%] md:max-w-[70%] mx-auto px-6 md:px-10">
        <div className="text-left space-y-5">
          <p className="font-michroma text-2xl md:text-3xl font-bold">
            What you have built:
          </p>

          <div className={anek.className}>
            <p className="text-base leading-relaxed lg:whitespace-nowrap whitespace-normal max-w-md">
              You created a full-stack authentication system for{" "}
              "CodeCoach" with:
            </p>
            <ul className="list-disc pl-6 text-base leading-relaxed mt-4">
              <li>Registration page with form validation</li>
              <li>Login page with credential verification</li>
              <li>Database integration using Prisma ORM</li>
              <li>NextAuth.js authentication flow</li>
              <li>Password hashing with bcrypt</li>
            </ul>
          </div>
        {/* Dropdown keywords*/}
          <p className="font-michroma text-2xl md:text-3xl font-bold mt-15">
            Knowledge Gaps:
          </p>

          <div className="mt-3 space-y-3">
            <GapItem 
                number="1."
                title="Data Flow Understanding"
                titleClassName="text-[#FF9D00]"
                preview={
                    <>
                    <p className="ml-4">You struggled with why first_name/last_name weren’t saving.</p>
                    <p className="ml-4"><strong>Gap:</strong> Not tracking how data transforms UI → API → DB</p>
                    <p className="ml-4"><strong>Study:</strong> Request/response lifecycle, payload mapping</p>
                    </>
                }
                >
              <p className= "text-[#FF9D00] ml-4 mt-4">
                <strong>Request / response lifecycle</strong>
              </p>
              <p className= "ml-4 mb-6 ">
              When a user fills out a form, the frontend temporarily stores the data (e.g., in React state). When the form is submitted, this data is sent as an HTTP request to the backend. The backend parses and validates the data, then processes it—often by interacting with the database to create or update records. Once processing is complete, the backend sends a response back to the frontend, indicating success or failure and sometimes returning the processed data. Understanding this lifecycle helps pinpoint where issues like missing or incorrect data occur.
              </p>
              <p className= "text-[#FF9D00] ml-4 mt-4">
                <strong>Payload Mapping</strong>
              </p>
              <p className= "ml-4">
              Payload mapping is the process of matching frontend data to the correct backend variables and database columns. For example, a frontend field labeled “name” must correspond to a backend field like “first_name.” If names or structures don’t match, the data can fail to save or be stored incorrectly. Proper payload mapping ensures that every piece of data flows correctly from the UI through the API and into the database, preventing bugs and data loss.
              </p>
            </GapItem>
            <GapItem 
                number="2."
                title="Module System"
                titleClassName="text-[#FFFB00]"
                preview={
                    <>
                    <p className="mb-1"> Confusion about bcryptjs import errors</p>
                    <p><strong>Gap:</strong> How npm packages work, node_modules, dependency resolution</p>
                    <p className="mb-0"><strong>Study:</strong> CommonJS vs ES Modules, package.json dependencies</p>
                    </>
                }>
              <p className= "text-[#FFFB00] ml-4 mt-4">
                <strong>Request / response lifecycle</strong>
              </p>
              <p className= "ml-4 mb-6">
              When a user fills out a form, the frontend temporarily stores the data (e.g., in React state). When the form is submitted, this data is sent as an HTTP request to the backend. The backend parses and validates the data, then processes it—often by interacting with the database to create or update records. Once processing is complete, the backend sends a response back to the frontend, indicating success or failure and sometimes returning the processed data. Understanding this lifecycle helps pinpoint where issues like missing or incorrect data occur.
              </p>
              <p className= "text-[#FFFB00] ml-4 mt-4">
                <strong>Payload Mapping</strong>
              </p>
              <p className= "ml-4">
              Payload mapping is the process of matching frontend data to the correct backend variables and database columns. For example, a frontend field labeled “name” must correspond to a backend field like “first_name.” If names or structures don’t match, the data can fail to save or be stored incorrectly. Proper payload mapping ensures that every piece of data flows correctly from the UI through the API and into the database, preventing bugs and data loss.
              </p>
            </GapItem>
            <GapItem 
            number="3."
            title="Async/Await Pattern" 
            titleClassName="text-[#BFFF00]"
            preview={
                <>
                <p> You used it correctly but may not fully understand promises.</p>
                <p><strong>Gap:</strong> </p>
                <p className="mb-0"><strong>Study:</strong> JavaScript event loop, promise chains</p>
                </>
            }>
              <p className= "text-[#BFFF00] ml-4 mt-4">
                <strong>Request / response lifecycle</strong>
              </p>
              <p className= "ml-4 mb-6">
              When a user fills out a form, the frontend temporarily stores the data (e.g., in React state). When the form is submitted, this data is sent as an HTTP request to the backend. The backend parses and validates the data, then processes it—often by interacting with the database to create or update records. Once processing is complete, the backend sends a response back to the frontend, indicating success or failure and sometimes returning the processed data. Understanding this lifecycle helps pinpoint where issues like missing or incorrect data occur.
              </p>
              <p className= "text-[#BFFF00] ml-4 mt-4">
                <strong>Payload Mapping</strong>
              </p>
              <p className= "ml-4">
              Payload mapping is the process of matching frontend data to the correct backend variables and database columns. For example, a frontend field labeled “name” must correspond to a backend field like “first_name.” If names or structures don’t match, the data can fail to save or be stored incorrectly. Proper payload mapping ensures that every piece of data flows correctly from the UI through the API and into the database, preventing bugs and data loss.
              </p>
            </GapItem>
            <GapItem 
            number="4."
            title="TypeScript Basics" 
            titleClassName="text-[#58EC4B]"
            preview={
                <>
                <p className="mb-1"> Using types but relying on any and implicit types</p>
                <p><strong>Gap:</strong> </p>
                <p className="mb-0"><strong>Study:</strong> Type inference, interfaces, generics</p>
                </>
            }>
              <p className= "text-[#58EC4B] ml-4 mt-4">
                <strong>Request / response lifecycle</strong>
              </p>
              <p className= "ml-4 mb-6">
              When a user fills out a form, the frontend temporarily stores the data (e.g., in React state). When the form is submitted, this data is sent as an HTTP request to the backend. The backend parses and validates the data, then processes it—often by interacting with the database to create or update records. Once processing is complete, the backend sends a response back to the frontend, indicating success or failure and sometimes returning the processed data. Understanding this lifecycle helps pinpoint where issues like missing or incorrect data occur.
              </p>
              <p className= "text-[#58EC4B] ml-4 mt-4">
                <strong>Payload Mapping</strong>
              </p>
              <p className= "ml-4">
              Payload mapping is the process of matching frontend data to the correct backend variables and database columns. For example, a frontend field labeled “name” must correspond to a backend field like “first_name.” If names or structures don’t match, the data can fail to save or be stored incorrectly. Proper payload mapping ensures that every piece of data flows correctly from the UI through the API and into the database, preventing bugs and data loss.
              </p>
            </GapItem>
            <GapItem 
            number="5. "
            title="CSS Layout (Tailwind)" 
            titleClassName="text-[#1CEF8D]"
            preview={
                <>
                <p className="mb-1"> Needed multiple attempts for symmetric divider lines</p>
                <p><strong>Gap:</strong>CSS Box Model, flex/grid context</p>
                <p className="mb-0"><strong>Study:</strong> How percentage widths are calculated relative to parent containers</p>
                </>
            }>
              <p className= "text-[#1CEF8D] ml-4 mt-4">
                <strong>Request / response lifecycle</strong>
              </p>
              <p className= "ml-4 mb-6">
              When a user fills out a form, the frontend temporarily stores the data (e.g., in React state). When the form is submitted, this data is sent as an HTTP request to the backend. The backend parses and validates the data, then processes it—often by interacting with the database to create or update records. Once processing is complete, the backend sends a response back to the frontend, indicating success or failure and sometimes returning the processed data. Understanding this lifecycle helps pinpoint where issues like missing or incorrect data occur.
              </p>
              <p className= "text-[#1CEF8D] ml-4 mt-4">
                <strong>Payload Mapping</strong>
              </p>
              <p className= "ml-4">
              Payload mapping is the process of matching frontend data to the correct backend variables and database columns. For example, a frontend field labeled “name” must correspond to a backend field like “first_name.” If names or structures don’t match, the data can fail to save or be stored incorrectly. Proper payload mapping ensures that every piece of data flows correctly from the UI through the API and into the database, preventing bugs and data loss.
              </p>
            </GapItem>
          </div>
        </div>
      </div>
      <div className="min-h-[20vh] w-full flex flex-col items-center justify-center text-center gap-8">
  <p className="font-michroma lg:text-4xl text-2xl font-bold mb-4">
    Are you ready to test your skills with a quiz?
  </p>

  <Link
    href="/quiz"
    className="inline-flex items-center justify-center px-10 py-6 md:px-12 md:py-4
               rounded-full bg-[#174914] text-[#FFF9B6] font-michroma text-3xl"
  >
    Quiz
  </Link>
    </div>
</div>
</main>
  );
}
