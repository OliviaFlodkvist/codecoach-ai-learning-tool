"use client";

import { useEffect, useState, useCallback } from "react";

interface AreaData {
  name: string;
  percentage: number;
}

interface CategoryData {
  SYSTEM_INTEGRATION?: AreaData[];
  CLOUD_COMPUTING?: AreaData[];
}

export default function LearningsChart() {
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBrickData = useCallback(async () => {
    try {
      const response = await fetch("/api/learning-bricks", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCategoryData(data.categoryData);
      }
    } catch (error) {
      console.error("Error fetching learning bricks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrickData();
  }, [fetchBrickData]);

  // Refresh data when the page becomes visible or focused (e.g., when returning from quiz)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchBrickData();
      }
    };

    const handleFocus = () => {
      fetchBrickData();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchBrickData]);

  // Helper function to calculate height based on percentage
  const calculateHeight = (percentage: number) => {
    // Minimum height is 8px (representing 0%), maximum is 144px (representing 100%)
    // Using the old scale: 8px = 0%, ~144px = 100%
    if (percentage === 0) return 8;
    return Math.max(8, (percentage / 100) * 136 + 8);
  };

  // Helper function to get bar color based on percentage
  // Uses the same color scheme as the quiz progress rings
  const getBarColor = (percentage: number) => {
    if (percentage === 0) return { bg: "#4a4a4a", border: "#6a6a6a" };
    if (percentage > 60) {
      // Green for good performance (>60%)
      return { bg: "#59DD45", border: "#64E850" };
    } else if (percentage > 40) {
      // Yellow for moderate performance (40-60%)
      return { bg: "#F3DD1A", border: "#FFF944" };
    } else {
      // Red for poor performance (<40%)
      return { bg: "#EC4220", border: "#FF6B55" };
    }
  };

  const renderChart = (
    title: string,
    category: "SYSTEM_INTEGRATION" | "CLOUD_COMPUTING",
    areas: string[]
  ) => {
    const colors =
      category === "SYSTEM_INTEGRATION"
        ? { bg: "#C18EF0", border: "#F0A6FF" }
        : { bg: "#8ABEE7", border: "#B2F0FF" };

    // Get data for this category or use empty array
    const dataForCategory = categoryData?.[category] || [];
    const areaMap = new Map(dataForCategory.map((d) => [d.name, d.percentage]));

    return (
      <div className="bg-gradient-to-br from-orange-500/2 to-orange-600/3 rounded-2xl p-8 border border-amber-300/40 w-full">
        <h3 className="font-michroma text-2xl font-bold text-[#FFC35B] mb-6 text-center">
          {title}
        </h3>

        {/* Chart Bars Container */}
        <div className="relative h-36 flex items-end justify-between px-4">
          {/* Baseline */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-300/40"></div>

          {areas.map((areaName) => {
            const percentage = areaMap.get(areaName) || 0;
            const height = calculateHeight(percentage);
            const dynamicColors = loading ? colors : getBarColor(percentage);

            return (
              <div
                key={areaName}
                className="flex flex-col items-center relative z-10"
              >
                <span className="font-michroma text-xs text-[#FFF08B] font-bold mb-2">
                  {areaName.replace(/_/g, " ")}
                </span>
                <div
                  className="w-12 rounded-t-md shadow-lg transition-all duration-500"
                  style={{
                    height: `${height}px`,
                    backgroundColor: dynamicColors.bg,
                    border: `2px solid ${dynamicColors.border}`,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-20 w-full max-w-6xl mx-auto pb-20">
      {/* Title */}
      <div className="text-center mb-12">
        <p className="font-michroma text-4xl">LEARNINGS</p>
      </div>

      {/* Charts Container */}
      <div className="flex flex-col gap-12">
        {loading ? (
          <div className="text-center">
            <p
              aria-live="polite"
              className="font-michroma text-xl font-bold
           text-transparent bg-clip-text
           bg-gradient-to-r from-amber-200/25 via-amber-200 to-amber-200/25
           [background-size:200%_100%] shimmer-text"
            >
              loading learning progress
            </p>

            <div
              role="progressbar"
              aria-valuetext="loading learning progress"
              className="h-1 w-64 bg-amber-200/150 progress-indeterminate mt-8 mx-auto"
            >
              <div className="bar" />
            </div>
          </div>
        ) : (
          <>
            {renderChart("SYSTEM INTEGRATION", "SYSTEM_INTEGRATION", [
              "API",
              "MICROSERVICES",
              "WEBHOOKS",
              "AUTHENTICATION",
              "ELT_TOOLS",
              "MIDDLEWARE",
            ])}

            {renderChart("CLOUD COMPUTING", "CLOUD_COMPUTING", [
              "IAAS",
              "PAAS",
              "FAAS",
              "CONTAINERS",
              "DEVOPS",
              "NETWORKING",
              "CON",
            ])}
          </>
        )}
      </div>
    </div>
  );
}
