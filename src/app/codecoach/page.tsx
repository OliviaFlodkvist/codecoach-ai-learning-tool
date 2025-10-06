"use client";

import { useState } from "react";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus({ type: null, message: "" });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus({
          type: "success",
          message: `Successfully uploaded ${result.fileName}! Session created/updated.`,
        });
      } else {
        setUploadStatus({
          type: "error",
          message: result.error || "Upload failed",
        });
      }
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = "";
    }
  };

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

        {/* Upload Status Messages */}
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

        {/* Custom File Upload Button */}
        <div className="relative">
          <label
            htmlFor="file-upload"
            className={`flex items-center justify-center mx-auto w-114 h-14 rounded-2xl
              bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black text-2xl font-bold cursor-pointer
              hover:from-gray-100 hover:via-gray-300 hover:to-gray-500 shadow-lg transition-all duration-200
              ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isUploading ? "Uploading..." : "Upload Your AI Prompts +"}
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".md,text/markdown"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  );
}
