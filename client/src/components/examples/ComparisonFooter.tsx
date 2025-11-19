import { useState } from "react";
import ComparisonFooter from "../ComparisonFooter";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import type { MedicarePlan } from "@shared/schema";

export default function ComparisonFooterExample() {
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set());

  const samplePlans: MedicarePlan[] = [
    {
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
    },
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

  const handleToggle = (planId: string, checked: boolean) => {
    setSelectedPlans((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(planId);
      } else {
        newSet.delete(planId);
      }
      return newSet;
    });
  };

  const handleRemove = (planId: string) => {
    setSelectedPlans((prev) => {
      const newSet = new Set(prev);
      newSet.delete(planId);
      return newSet;
    });
  };

  const selectedPlanObjects = samplePlans.filter(plan => selectedPlans.has(plan.id));

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-xl font-semibold">Select plans to see the comparison footer</h3>
        
        <div className="space-y-4">
          {samplePlans.map((plan) => (
            <Card key={plan.id} className="p-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedPlans.has(plan.id)}
                  onCheckedChange={(checked) => handleToggle(plan.id, checked === true)}
                />
                <div>
                  <h4 className="font-semibold">{plan.planName}</h4>
                  <p className="text-sm text-muted-foreground">{plan.carrier}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ComparisonFooter plans={selectedPlanObjects} onRemovePlan={handleRemove} />
    </div>
  );
}
