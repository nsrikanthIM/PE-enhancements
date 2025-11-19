import { useState } from "react";
import { Button } from "@/components/ui/button";
import MatchScoreForm from "../MatchScoreForm";

export default function MatchScoreFormExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <Button onClick={() => setOpen(true)} data-testid="button-open-form">
        Open Match Score Form
      </Button>
      <MatchScoreForm open={open} onOpenChange={setOpen} />
    </div>
  );
}
