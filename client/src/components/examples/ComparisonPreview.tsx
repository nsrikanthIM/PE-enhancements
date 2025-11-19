import { useState } from "react";
import { Button } from "@/components/ui/button";
import ComparisonPreview from "../ComparisonPreview";
import type { MedicarePlan } from "@shared/schema";

export default function ComparisonPreviewExample() {
  const [showComparison, setShowComparison] = useState(false);

  const samplePlans: MedicarePlan[] = [
    {
      id: "2",
      planName: "Aetna Medicare Value Plus (HMO) H2663-053",
      carrier: "Aetna Medicare",
      year: 2026,
      starRating: 4,
      monthlyPremium: "44.10",
      medicalDeductible: "0",
      outOfPocketMax: "4500",
      rxDrugDeductible: "615.00",
      estimatedAnnualRxCost: "0",
      pharmaciesCovered: 1,
      doctorName: "Tommy Rose",
      matchScore: 95,
      recommended: 0,
    },
    {
      id: "3",
      planName: "UnitedHealthcare AARP Medicare Advantage Plan 1",
      carrier: "UnitedHealthcare",
      year: 2026,
      starRating: 5,
      monthlyPremium: "0",
      medicalDeductible: "250",
      outOfPocketMax: "5500",
      rxDrugDeductible: "0",
      estimatedAnnualRxCost: "175",
      pharmaciesCovered: 1,
      doctorName: "Dr. Sarah Johnson",
      matchScore: 90,
      recommended: 0,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <Button onClick={() => setShowComparison(true)} data-testid="button-show-comparison">
        Show Comparison Preview
      </Button>
      {showComparison && (
        <ComparisonPreview plans={samplePlans} onClose={() => setShowComparison(false)} />
      )}
    </div>
  );
}
