import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { MedicarePlan } from "@shared/schema";

interface MatchScoreBreakdownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: MedicarePlan;
}

interface RequirementMatch {
  category: string;
  matched: boolean;
  weight: number;
  description: string;
  status: "matched" | "partial" | "not_matched";
}

export default function MatchScoreBreakdownModal({ 
  open, 
  onOpenChange, 
  plan 
}: MatchScoreBreakdownModalProps) {
  
  // Generate requirement matches based on plan details
  const getRequirementMatches = (): RequirementMatch[] => {
    const matches: RequirementMatch[] = [];
    
    // Cost effectiveness (30% weight)
    const premiumValue = parseFloat(plan.monthlyPremium);
    if (premiumValue === 0) {
      matches.push({
        category: "Cost Effectiveness",
        matched: true,
        weight: 30,
        description: "✓ $0 monthly premium - Excellent value",
        status: "matched"
      });
    } else if (premiumValue < 50) {
      matches.push({
        category: "Cost Effectiveness",
        matched: true,
        weight: 25,
        description: `✓ Low monthly premium of ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(premiumValue)}`,
        status: "matched"
      });
    } else {
      matches.push({
        category: "Cost Effectiveness",
        matched: false,
        weight: 15,
        description: `⚠ Higher monthly premium of ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(premiumValue)}`,
        status: "partial"
      });
    }

    // Quality rating (20% weight)
    if (plan.starRating >= 4) {
      matches.push({
        category: "Quality Rating",
        matched: true,
        weight: 20,
        description: `✓ High quality plan with ${plan.starRating} star rating`,
        status: "matched"
      });
    } else if (plan.starRating === 3) {
      matches.push({
        category: "Quality Rating",
        matched: false,
        weight: 12,
        description: "⚠ Average 3 star rating",
        status: "partial"
      });
    } else {
      matches.push({
        category: "Quality Rating",
        matched: false,
        weight: 5,
        description: "✗ Below average star rating",
        status: "not_matched"
      });
    }

    // Network coverage (25% weight)
    if (plan.doctorName && plan.pharmaciesCovered > 0) {
      matches.push({
        category: "Network Coverage",
        matched: true,
        weight: 25,
        description: `✓ Your doctor (${plan.doctorName}) and ${plan.pharmaciesCovered} pharmacy in network`,
        status: "matched"
      });
    } else if (plan.doctorName || plan.pharmaciesCovered > 0) {
      matches.push({
        category: "Network Coverage",
        matched: false,
        weight: 15,
        description: plan.doctorName 
          ? `⚠ Your doctor (${plan.doctorName}) in network, but limited pharmacy coverage`
          : "⚠ Pharmacy coverage available, but doctor not in network",
        status: "partial"
      });
    } else {
      matches.push({
        category: "Network Coverage",
        matched: false,
        weight: 5,
        description: "✗ Limited network coverage - verify your providers",
        status: "not_matched"
      });
    }

    // Out-of-pocket protection (15% weight)
    const maxOOP = parseFloat(plan.outOfPocketMax);
    if (maxOOP <= 5000) {
      matches.push({
        category: "Out-of-Pocket Protection",
        matched: true,
        weight: 15,
        description: `✓ Strong protection with ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(maxOOP)} max`,
        status: "matched"
      });
    } else if (maxOOP <= 7000) {
      matches.push({
        category: "Out-of-Pocket Protection",
        matched: false,
        weight: 10,
        description: `⚠ Moderate protection with ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(maxOOP)} max`,
        status: "partial"
      });
    } else {
      matches.push({
        category: "Out-of-Pocket Protection",
        matched: false,
        weight: 5,
        description: `✗ Higher out-of-pocket max of ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(maxOOP)}`,
        status: "not_matched"
      });
    }

    // Prescription drug coverage (10% weight)
    const rxDeductible = parseFloat(plan.rxDrugDeductible);
    if (rxDeductible === 0) {
      matches.push({
        category: "Prescription Coverage",
        matched: true,
        weight: 10,
        description: "✓ No prescription drug deductible",
        status: "matched"
      });
    } else if (rxDeductible <= 500) {
      matches.push({
        category: "Prescription Coverage",
        matched: false,
        weight: 7,
        description: `⚠ Low Rx deductible of ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(rxDeductible)}`,
        status: "partial"
      });
    } else {
      matches.push({
        category: "Prescription Coverage",
        matched: false,
        weight: 3,
        description: `✗ Higher Rx deductible of ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(rxDeductible)}`,
        status: "not_matched"
      });
    }

    return matches;
  };

  const requirements = getRequirementMatches();
  const totalScore = requirements.reduce((sum, req) => sum + req.weight, 0);

  const getIcon = (status: string) => {
    switch (status) {
      case "matched":
        return <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />;
      case "partial":
        return <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />;
      case "not_matched":
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "matched":
        return "bg-green-100 dark:bg-green-950 border-green-300 dark:border-green-800";
      case "partial":
        return "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-800";
      case "not_matched":
        return "bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-800";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary">
              <span className="text-2xl font-bold text-primary">{plan.matchScore}%</span>
            </div>
            <div>
              <div>Match Score Breakdown</div>
              <DialogDescription className="text-base mt-1">
                {plan.planName}
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Overall Score</span>
              <span className="text-sm font-bold text-primary">{totalScore}%</span>
            </div>
            <Progress value={totalScore} className="h-3" />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-base mb-4">Requirements Match Analysis</h4>
            <div className="space-y-3">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${getStatusColor(req.status)}`}
                  data-testid={`requirement-${index}-${plan.id}`}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(req.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{req.category}</span>
                        <span className="text-sm font-bold">{req.weight}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {req.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Note:</span> This match score is calculated based on your basic profile (ZIP code and age). 
              Add your doctors, prescriptions, and health preferences to get a more accurate personalized match.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
