import { useState } from "react";
import CurrentPlanBanner from "../CurrentPlanBanner";
import type { MedicarePlan } from "@shared/schema";

export default function CurrentPlanBannerExample() {
  const [currentPlan, setCurrentPlan] = useState<MedicarePlan | null>(null);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-background">
      <div>
        <h3 className="text-lg font-semibold mb-4">Without Current Plan</h3>
        <CurrentPlanBanner currentPlan={null} onPlanAdded={setCurrentPlan} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Current Plan Set</h3>
        <CurrentPlanBanner 
          currentPlan={currentPlan || {
            id: "current",
            planName: "AARP Medicare Advantage",
            carrier: "UnitedHealthcare",
            year: 2025,
            starRating: 4,
            monthlyPremium: "65.00",
            medicalDeductible: "0",
            outOfPocketMax: "5000",
            rxDrugDeductible: "0",
            estimatedAnnualRxCost: "0",
            pharmaciesCovered: 1,
            doctorName: null,
            matchScore: 0,
            recommended: 0,
          }} 
          onPlanAdded={setCurrentPlan} 
        />
      </div>
    </div>
  );
}
