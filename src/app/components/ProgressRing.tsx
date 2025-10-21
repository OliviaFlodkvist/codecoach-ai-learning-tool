import React, { useEffect, useRef, useState } from "react";

interface ProgressRingProps {
  size?: number;
  strokeWidth?: number;
  percent: number;
  trackColor?: string;
  progressColor?: string;
  label?: string;
  durationMs?: number;
  delayMs?: number;
  autoColor?: boolean;
  lightText?: boolean; // if true, use lighter text style
}

export default function ProgressRing({
  size = 120,
  strokeWidth = 12,
  percent,
  trackColor = "#E2C3A3",
  progressColor = "#E2C3A3",
  label,
  durationMs = 1200,
  delayMs = 0,
  autoColor = false,
  lightText = false,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));

  // Determine color based on percentage if autoColor is enabled
  const getProgressColor = () => {
    if (!autoColor) return progressColor;

    if (clamped <= 40) {
      return "#EC4220"; // Red
    } else if (clamped <= 60) {
      return "#F3DD1A"; // Yellow
    } else {
      return "#59DD45"; // Green
    }
  };

  const finalProgressColor = getProgressColor();

  // Get text color based on progress color when autoColor is enabled
  const getTextColor = () => {
    return "text-[#FFF08B]"; // Always use #FFF08B color
  };

  const [animatedPercent, setAnimatedPercent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    // reset
    setAnimatedPercent(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    startRef.current = null;

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - (startRef.current || 0);
      const t = Math.min(1, elapsed / durationMs);
      const value = clamped * t; // linear ease
      setAnimatedPercent(value);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };

    timerRef.current = window.setTimeout(() => {
      rafRef.current = requestAnimationFrame(step);
    }, Math.max(0, delayMs));
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [clamped, durationMs, delayMs]);

  const offset = circumference - (animatedPercent / 100) * circumference;

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg width={size} height={size}>
        <circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
          opacity={0.6}
        />
        <circle
          stroke={finalProgressColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-orbitron ${getTextColor()} ${
            lightText ? "text-2xl font-light" : "text-xl"
          }`}
        >
          {Math.round(animatedPercent)} %
        </span>
        {label ? (
          <span className="text-xs text-amber-200/80 mt-1">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
