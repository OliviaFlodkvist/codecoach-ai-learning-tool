"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const router = useRouter();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus({ type: null, message: "" });
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      setUploadStatus({ type: "error", message: "Please select a file first." });
      return;
    }

    setIsUploading(true);
    setIsGenerating(true);
    setUploadStatus({ type: null, message: "" });

    let navigated = false; 

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploadResult.error || "Upload failed");

      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: uploadResult.sessionId }),
      });
      const generateResult = await generateResponse.json();
      if (!generateResponse.ok) throw new Error(generateResult.error || "Generation failed");

      // Keep loading UI ON while navigating (prevents flash)
      navigated = true;
      router.push(`/summary?sessionId=${uploadResult.sessionId}`);

      // (Optional) don’t reset the input until after navigation in the next page
      // or keep this — it won’t affect the loading lock:
      setSelectedFile(null);
      const fileInput = document.getElementById("file-upload") as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Network error. Please try again.",
      });
    } finally {
      // Only clear loading if we did NOT navigate (i.e., on error)
      if (!navigated) {
        setIsUploading(false);
        setIsGenerating(false);
      }
    }
  };



  
  const loading = isUploading || isGenerating;
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col w-full text-amber-200">
        <div className="flex-1 flex flex-col gap-6 items-center justify-center w-full text-center px-4">
          <p
            aria-live="polite"
            className="font-michroma text-xl font-bold
                       text-transparent bg-clip-text
                       bg-gradient-to-r from-amber-200/25 via-amber-200 to-amber-200/25
                       [background-size:200%_100%] shimmer-text"
          >
            uploading file
          </p>

          <div
            role="progressbar"
            aria-valuetext="Uploading file..."
            className="h-1 w-64 bg-amber-200/150 progress-indeterminate"
          >
            <div className="bar" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[90%] md:max-w-[80%] p-6 rounded-2xl text-center flex flex-col gap-12">
        <h1 className="text-5xl font-orbitron md:text-8xl font-semibold tracking-wide whitespace-nowrap tracking-[0.005em] text-[#FFC35B] text-stroke-yellow">
          &lt;Code/&gt; Coach
        </h1>

        <div className="text-lg font-michroma text-amber-200 mb-8 space-y-2">
          <p>Code Coach turns your coding sessions into lasting knowledge!</p>
          <p>Upload your AI prompts and Code Coach will deliver tailored quizzes and summaries</p>
          <p>to reinforce key concepts and help you strengthen your understanding.</p>
        </div>

        {uploadStatus.type && (
          <div
            className={`p-4 rounded-lg text-lg font-medium ${
              uploadStatus.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {uploadStatus.message}
          </div>
        )}

      <div className="flex justify-center">
        <div className="flex items-center p-2 rounded-lg w-fit gap-3">
          {/* Upload-knapp */}
          <label
            htmlFor="file-upload"
            className={`relative inline-flex items-center
              h-14 w-[18rem] md:w-[22rem] rounded-2xl
              bg-amber-100 text-black border-2 border-amber-300
              shadow-lg transition-colors duration-150
              ${isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {/* Truncate: ellips, ingen layout-shift */}
            <span
              className="block w-full px-4 text-left font-bold text-base md:text-lg truncate"
              title={selectedFile ? selectedFile.name : "Upload Your AI Prompts +"}
            >
              {selectedFile ? selectedFile.name : "Upload Your AI Prompts +"}
            </span>

            <input
              id="file-upload"
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".md,text/markdown"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </label>

          {/* Generate-knapp */}
          <button
            onClick={handleGenerate}
            disabled={isUploading || isGenerating || !selectedFile}
            className={`inline-flex items-center justify-center
              h-14 w-[10.5rem] rounded-2xl
              bg-amber-100 text-black text-lg font-bold
              border-2 border-amber-300
              shadow-lg
              transition-colors duration-150
              ${!selectedFile || isUploading || isGenerating
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90 cursor-pointer"}`}
          >
            {isGenerating ? "Generating..." : isUploading ? "Uploading..." : "Generate"}
          </button>
        </div>
      </div>
        </div>
      </div>
  );
}
