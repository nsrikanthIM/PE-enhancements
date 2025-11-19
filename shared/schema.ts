// Simple TypeScript types for static UI application
// No backend or database dependencies

export interface MedicarePlan {
  id: string;
  planName: string;
  carrier: string;
  year: number;
  starRating: number;
  monthlyPremium: string;
  medicalDeductible: string;
  outOfPocketMax: string;
  rxDrugDeductible: string;
  estimatedAnnualRxCost: string;
  pharmaciesCovered: number;
  doctorName: string | null;
  matchScore: number;
  recommended: number;
}

export interface PlanChangeImpact {
  yearlySavings: number;
  doctorsLost: number;
  doctorsGained: number;
  pharmaciesLost: number;
  pharmaciesGained: number;
  coverageChanges: string[];
}

export interface User {
  id: string;
  username: string;
  currentPlanId?: string | null;
}

export interface InsertUser {
  username: string;
  currentPlanId?: string | null;
}
