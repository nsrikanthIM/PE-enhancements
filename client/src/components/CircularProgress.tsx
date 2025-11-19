import { useEffect, useState } from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  blurred?: boolean;
  onClick?: () => void;
}

export default function CircularProgress({
  percentage,
  size = 96,
  strokeWidth = 8,
  className = "",
  blurred = false,
  onClick,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 90) return "#22C55E";
    if (score >= 75) return "#F59E0B";
    return "#F97316";
  };

  useEffect(() => {
    const duration = 1400;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (percentage * currentStep) / steps;
      setProgress(Math.min(newProgress, percentage));
      setDisplayPercentage(Math.min(Math.round(newProgress), percentage));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [percentage]);

  return (
    <div
      className={`relative ${onClick ? "cursor-pointer hover-elevate active-elevate-2" : ""} ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      data-testid="circular-progress"
    >
      <svg
        width={size}
        height={size}
        className={`transform -rotate-90 ${blurred ? "blur-sm" : ""}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted opacity-20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(percentage)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${blurred ? "blur-sm" : ""}`}>
        <div className="text-2xl font-bold" style={{ color: getColor(percentage) }}>
          {displayPercentage}%
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">Match</div>
      </div>
      {blurred && onClick && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs font-medium text-primary bg-white px-2 py-1 rounded-md shadow-md">
            Click to unlock
          </div>
        </div>
      )}
    </div>
  );
}
