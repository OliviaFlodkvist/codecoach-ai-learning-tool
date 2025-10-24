"use client";

import React from "react";

interface QuizRedoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  quizDate: string;
  quizScore: number;
}

export default function QuizRedoModal({
  isOpen,
  onClose,
  onConfirm,
  quizDate,
  quizScore,
}: QuizRedoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center">
      {/* Modal */}
      <div
        className="relative rounded-xl border border-amber-300/40 p-8 max-w-md w-full mx-4 bg-black/20 backdrop-blur-sm"
        style={{
          color: "#2b2b2b",
        }}
      >
        <div className="text-center">
          <h2 className="font-michroma text-2xl text-amber-200 mb-6">
            Redo Quiz?
          </h2>

          <p className="font-michroma text-amber-200/90 mb-8">
            Previous score: {quizScore}%
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="w-32 px-6 py-3 border border-amber-300/40 text-amber-200 rounded-full hover:bg-amber-300/10 transition-colors font-michroma"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="w-32 px-6 py-3 bg-[#174914] text-[#FFF08B] rounded-full hover:bg-[#2a5f2a] transition-colors font-michroma font-semibold"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
