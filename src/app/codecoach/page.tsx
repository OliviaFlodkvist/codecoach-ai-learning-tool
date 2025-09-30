export default function UploadPage() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-orange-500 via-orange-600 to-black flex items-center justify-center">
        <div className="w-full max-w-[90%] md:max-w-[80%] p-6 rounded-2xl text-center flex flex-col gap-12">
          <h1 className="text-5xl md:text-8xl font-semibold tracking-wide text-black whitespace-nowrap">
            &lt;Code/&gt; Coach
          </h1>

            
            {/* Subtitle / description */}
            <p className="text-2xl text-black mb-8">
              Generate quizzes or summaries
            </p>
  
            {/* Custom File Upload Button */}
            <label className="flex items-center justify-center mx-auto w-114 h-14 rounded-2xl
                bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black text-2xl font-bold cursor-pointer
                hover:from-gray-100 hover:via-gray-300 hover:to-gray-500 shadow-lg">
                Upload Your AI Prompts &nbsp; +
            </label>
            <input type="file" className="hidden" />
          </div>
        </div>
    );
  }