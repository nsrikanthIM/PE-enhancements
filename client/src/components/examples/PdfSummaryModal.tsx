import { useState } from "react";
import { Button } from "@/components/ui/button";
import PdfSummaryModal from "../PdfSummaryModal";
import type { MedicarePlan } from "@shared/schema";

export default function PdfSummaryModalExample() {
  const [open, setOpen] = useState(false);

  const samplePlan: MedicarePlan = {
    id: "1",
    planName: "AARP Medicare Advantage Patriot No Rx KS-MA01 (PPO)",
    carrier: "UnitedHealthcare",
    year: 2026,
    starRating: 3,
    monthlyPremium: "0",
    medicalDeductible: "0",
    outOfPocketMax: "6700",
    rxDrugDeductible: "0",
    estimatedAnnualRxCost: "0",
    pharmaciesCovered: 0,
    doctorName: null,
    matchScore: 85,
    recommended: 0,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <Button onClick={() => setOpen(true)} data-testid="button-open-pdf">
        Open PDF Summary Modal
      </Button>
      <PdfSummaryModal open={open} onOpenChange={setOpen} plan={samplePlan} />
    </div>
  );
}
