"use client";
import { useState } from "react";

type GapItemProps = {
  number?: string;                 
  title: string;
  preview?: React.ReactNode;       
  children?: React.ReactNode;      
  titleClassName?: string;
  defaultOpen?: boolean;
  compact?: boolean;
};

export default function GapItem({
  number,
  title,
  preview,
  children,
  titleClassName = "",
  defaultOpen = false,
  compact = true,
}: GapItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = `${title.replace(/\s+/g, "-").toLowerCase()}-content`;

  return (
    <div className="rounded-lg border border-[#FFC44D]/50">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={contentId}
        className={`${compact ? "px-4 py-2" : "p-4"} w-full text-left hover:cursor-pointer `}
      >
        <div className="flex items-start gap-3">
          {/* Number column */}
            {number ? (
            <span
                className={`w-6 shrink-0 text-right font-bold tabular-nums leading-6 pt-0.5 ${titleClassName}`}
            >
                {number}
            </span>
            ) : null}


          {/* Title + preview */}
          <div className="flex-1 min-w-0">
            <span className={`block font-semibold ${titleClassName}`}>{title}</span>
            {preview && (
              <div className="text-sm opacity-90 leading-snug [&>p]:m-0">
                {preview}
              </div>
            )}
          </div>

          {/* Chevron */}
          <svg
            className={`ml-3 h-8 w-8 flex-shrink-0 self-center transition-transform ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
          >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.06l3.71-2.83a.75.75 0 1 1 .92 1.18l-4.2 3.2a.75.75 0 0 1-.92 0l-4.2-3.2a.75.75 0 0 1-.02-1.06z"/>
          </svg>
        </div>
      </button>

    {/* Collapsible body */}
    <div
    id={contentId}
    role="region"
    aria-hidden={!open}
    className={`overflow-hidden transition-[max-height] duration-300 hover:cursor-pointer ${
        open ? "max-h-96 pb-4" : "max-h-0 pb-0"
    }`}
    >
    {/* keep the same side padding as header */}
    <div className="px-4">
        {/* indent so content aligns under the title (not the number) */}
        <div className="ml-5">
        {children}
        </div>
    </div>
    </div>

    </div>
  );
}
