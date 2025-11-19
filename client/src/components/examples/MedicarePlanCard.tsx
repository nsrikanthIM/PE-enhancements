import MedicarePlanCard from "../MedicarePlanCard";
import type { MedicarePlan } from "@shared/schema";

export default function MedicarePlanCardExample() {
  const samplePlan: MedicarePlan = {
    id: "1",
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
    recommended: 1,
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <MedicarePlanCard
        plan={samplePlan}
        onCompareChange={(checked) => console.log("Compare toggled:", checked)}
        onViewDetails={() => console.log("View details clicked")}
        onEnroll={() => console.log("Enroll clicked")}
      />
    </div>
  );
}
