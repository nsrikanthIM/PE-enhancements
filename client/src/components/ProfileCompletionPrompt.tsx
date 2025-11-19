import { Button } from "@/components/ui/button";
import { AlertCircle, Sparkles } from "lucide-react";

interface ProfileCompletionPromptProps {
  planId: string;
  onImproveClick?: () => void;
}

export default function ProfileCompletionPrompt({ planId, onImproveClick }: ProfileCompletionPromptProps) {
  const handleClick = () => {
    if (onImproveClick) {
      onImproveClick();
    } else {
      console.log("Improve matches clicked for plan:", planId);
      alert("This would open a form to add your doctors, prescriptions, and preferences to improve match accuracy.");
    }
  };

  return (
    <div 
      className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 flex items-start gap-3"
      data-testid={`prompt-profile-completion-${planId}`}
    >
      <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-relaxed">
          Your match is based only on your <span className="font-semibold">ZIP and age</span>. 
          Add your doctors and prescriptions for a more accurate fit.
        </p>
      </div>
      <Button
        size="sm"
        onClick={handleClick}
        className="flex-shrink-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold"
        data-testid={`button-improve-matches-${planId}`}
      >
        <Sparkles className="w-4 h-4 mr-1.5" />
        Improve my matches
      </Button>
    </div>
  );
}
