import { useEffect, useState } from "react";
import { Lock, Sparkles } from "lucide-react";

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
      className={`relative rounded-full ${onClick ? "cursor-pointer transition-transform hover:scale-105" : ""} ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      data-testid="circular-progress"
    >
      {blurred && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent backdrop-blur-md z-20 border-2 border-primary/30 shadow-lg">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
            <div className="bg-white/95 px-3 py-2 rounded-lg shadow-xl border border-primary/20 transform transition-all hover:scale-105 hover:shadow-2xl">
              <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold text-primary">Your Match Score</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Click to see how well this plan fits you</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none"></div>
        </div>
      )}
      
      <svg
        width={size}
        height={size}
        className={`transform -rotate-90 ${blurred ? "blur-sm opacity-60" : ""}`}
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
      
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${blurred ? "blur-sm opacity-60" : ""}`}>
        <div className="text-2xl font-bold" style={{ color: getColor(percentage) }}>
          {displayPercentage}%
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">Match</div>
      </div>
    </div>
  );
}
