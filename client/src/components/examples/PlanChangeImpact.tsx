import PlanChangeImpact from "../PlanChangeImpact";
import type { PlanChangeImpact as PlanChangeImpactType } from "@shared/schema";

export default function PlanChangeImpactExample() {
  const sampleImpact: PlanChangeImpactType = {
    yearlySavings: 540,
    doctorsLost: 1,
    doctorsGained: 0,
    pharmaciesLost: 0,
    pharmaciesGained: 2,
    coverageChanges: ["Vision coverage will be reduced"],
  };

  const sampleImpactCost: PlanChangeImpactType = {
    yearlySavings: -320,
    doctorsLost: 0,
    doctorsGained: 3,
    pharmaciesLost: 1,
    pharmaciesGained: 0,
    coverageChanges: ["Better dental coverage", "International travel coverage added"],
  };

  return (
    <div className="p-8 space-y-6 max-w-3xl mx-auto bg-background">
      <div>
        <h3 className="text-lg font-semibold mb-4">Example 1: Savings with Trade-offs</h3>
        <div className="bg-white rounded-lg p-4">
          <PlanChangeImpact impact={sampleImpact} planId="example-1" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Example 2: Higher Cost with Benefits</h3>
        <div className="bg-white rounded-lg p-4">
          <PlanChangeImpact impact={sampleImpactCost} planId="example-2" />
        </div>
      </div>
    </div>
  );
}
