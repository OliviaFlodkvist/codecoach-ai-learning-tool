export default function AboutPage() {
  return (
    <div className="min-h-screen w-full flex flex-col mt-10 items-center text-amber-200">
      {/* About Code Coach - vertically centered in the first viewport */}
      <div className="min-h-[70vh] flex flex-col justify-center items-center w-full max-w-[90%] md:max-w-[80%] p-6 text-center gap-6">
        <p className="font-michroma text-3xl md:text-4xl font-bold">
          About Code Coach
        </p>
        <div className="mx-auto w-full max-w-3xl border-t border-[#FFF08B]/60" />
        <p className="text-lg font-sans leading-relaxed max-w-3xl">
          At Code Coach, we believe that true learning in programming comes from
          understanding — not just getting the right answer. Today, many
          developers rely on AI tools to solve coding problems. While these
          tools can be incredibly helpful, we often notice a common pattern:
          learners focus on making their code “work” and skip over the
          explanations that could deepen their knowledge. As a result, they
          solve the task at hand but miss the opportunity to build lasting
          skills.
        </p>
        <p className="text-lg leading-relaxed max-w-3xl">
          Code Coach was created to bridge this gap. Our platform looks at the
          prompts you give, the solutions you adopt, and the moments where you
          get stuck. From this, Code Coach generates adaptive quizzes and clear
          summaries — all tailored to the code you’ve actually been writing.
        </p>{" "}
      </div>

      {/* How It Works + Our Mission - sits below the first block */}
      <div className="w-full max-w-[90%] md:max-w-[80%] p-6 flex gap-8 md:gap-12 mb-16">
        {/* How It Works */}
        <div className="basis-1/2 rounded-xl border border-[#FFF08B]/35 p-6 md:p-8 text-center bg-black/10">
          <p className="text-3xl font-orbitron font-bold mb-4">How It Works</p>
          <p className="text-base leading-relaxed">
            <strong>Upload Your Prompts:</strong> Share the conversations you’ve
            had with AI tools.
          </p>
          <p className="text-base font-sans leading-relaxed">
            <strong>Smart Analysis:</strong> Code Coach examines your questions,
            the solutions you implemented, and the concepts involved.
          </p>
          <p className="text-base font-sans leading-relaxed">
            <strong>Quizzes:</strong> Short, focused questions that reinforce
            the concepts you just used.
          </p>
          <p className="text-base font-sans leading-relaxed">
            <strong>Summaries:</strong> Clear overviews of what you built and
            the key ideas behind it.
          </p>
        </div>

        {/* Our Mission */}
        <div className="basis-1/2 rounded-xl border border-[#FFF08B]/35 p-6 md:p-8 text-center bg-black/10">
          <p className="text-3xl font-orbitron font-bold mb-4">Our Mission</p>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-base font-sans leading-relaxed text-center max-w-prose">
              We want to make coding education more reflective, interactive, and
              sustainable. By combining the power of AI with a focus on human
              understanding, Code Coach empowers learners to move beyond
              copy-and-paste solutions and truly master the concepts that
              matter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
