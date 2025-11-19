import MedicarePlanCard from "../MedicarePlanCard";
import type { MedicarePlan } from "@shared/schema";

export default function MedicarePlanCardExample() {
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
    <div className="p-8 flex items-center justify-center min-h-screen bg-background">
      <MedicarePlanCard
        plan={samplePlan}
        onCompareChange={(checked) => console.log("Compare toggled:", checked)}
        onViewDetails={() => console.log("View details clicked")}
        onEnroll={() => console.log("Enroll clicked")}
      />
    </div>
  );
}
