"use client";

import { useState } from "react";
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

      setUploadStatus({
        type: "success",
        message: `Successfully generated summary, keywords, and quiz for ${uploadResult.fileName}!`,
      });

      setTimeout(() => {
        router.push(`/summary?sessionId=${uploadResult.sessionId}`);
      }, 1000);

      setSelectedFile(null);
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Network error. Please try again.",
      });
    } finally {
      setIsUploading(false);
      setIsGenerating(false);
    }
  };

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
          <div className="flex items-center p-2 rounded-lg w-fit gap-2">
            <label
              htmlFor="file-upload"
              className={`flex items-center justify-center relative w-114 h-14 rounded-2xl
                bg-amber-100 text-black text-xl font-bold cursor-pointer
                hover:from-gray-100 hover:via-gray-300 hover:to-gray-500 shadow-lg transition-all duration-200
                ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {selectedFile ? selectedFile.name : "Upload Your AI Prompts +"}
              <input
                id="file-upload"
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept=".md,text/markdown"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
            </label>

            <button
              onClick={handleGenerate}
              disabled={isUploading || isGenerating || !selectedFile}
              className={`flex items-center justify-center w-36 h-14 rounded-2xl 
                bg-amber-100 text-black text-xl border border-amber-300 
                font-bold cursor-pointer hover:from-gray-100 hover:via-gray-300 hover:to-gray-500 transition-all duration-200
                ${!selectedFile || isUploading || isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isGenerating ? "Generating..." : isUploading ? "Uploading..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
