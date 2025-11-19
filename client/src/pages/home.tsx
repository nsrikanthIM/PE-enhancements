import { useState } from "react";
import MedicarePlanCard from "@/components/MedicarePlanCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, SlidersHorizontal } from "lucide-react";
import type { MedicarePlan, PlanChangeImpact } from "@shared/schema";

export default function Home() {
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set());

  // Mock data - simulating a returning user with an existing plan
  const mockPlans: MedicarePlan[] = [
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
    {
      id: "4",
      planName: "Humana Gold Plus H1036-239 (HMO)",
      carrier: "Humana",
      year: 2026,
      starRating: 4,
      monthlyPremium: "32.50",
      medicalDeductible: "150",
      outOfPocketMax: "4800",
      rxDrugDeductible: "480.00",
      estimatedAnnualRxCost: "120",
      pharmaciesCovered: 1,
      doctorName: null,
      matchScore: 82,
      recommended: 0,
    },
  ];

  // Mock plan change impacts - simulating comparison with current plan
  const mockImpacts: Record<string, PlanChangeImpact> = {
    "2": {
      yearlySavings: 540,
      doctorsLost: 1,
      doctorsGained: 0,
      pharmaciesLost: 0,
      pharmaciesGained: 1,
      coverageChanges: [],
    },
    "3": {
      yearlySavings: 320,
      doctorsLost: 0,
      doctorsGained: 2,
      pharmaciesLost: 0,
      pharmaciesGained: 1,
      coverageChanges: ["Better prescription drug coverage"],
    },
    "4": {
      yearlySavings: -180,
      doctorsLost: 0,
      doctorsGained: 1,
      pharmaciesLost: 0,
      pharmaciesGained: 0,
      coverageChanges: ["Enhanced dental coverage", "Vision coverage included"],
    },
  };

  const handleCompareToggle = (planId: string, checked: boolean) => {
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Medicare Plans 2026</h1>
              <p className="text-muted-foreground mt-1">
                Find the perfect Medicare plan based on your needs
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" data-testid="button-filters">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" data-testid="button-sort">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Available Plans</h2>
            <Badge variant="secondary" data-testid="badge-count">
              {mockPlans.length} plans found
            </Badge>
          </div>
          {selectedPlans.size > 0 && (
            <Badge className="bg-primary text-primary-foreground" data-testid="badge-selected">
              {selectedPlans.size} selected for comparison
            </Badge>
          )}
        </div>

        <div className="flex flex-col items-center gap-6">
          {mockPlans.map((plan) => (
            <MedicarePlanCard
              key={plan.id}
              plan={plan}
              planChangeImpact={mockImpacts[plan.id] || null}
              onCompareChange={(checked) => handleCompareToggle(plan.id, checked)}
              onViewDetails={() => console.log("View details:", plan.planName)}
              onEnroll={() => console.log("Enroll in:", plan.planName)}
            />
          ))}
        </div>

        {selectedPlans.size >= 2 && (
          <div className="fixed bottom-6 right-6 z-20">
            <Button size="lg" className="shadow-lg" data-testid="button-compare-plans">
              Compare {selectedPlans.size} Plans
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
