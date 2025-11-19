import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Star, Info, Building2, User, Pill } from "lucide-react";
import CircularProgress from "./CircularProgress";
import type { MedicarePlan } from "@shared/schema";

interface MedicarePlanCardProps {
  plan: MedicarePlan;
  onCompareChange?: (checked: boolean) => void;
  onViewDetails?: () => void;
  onEnroll?: () => void;
}

export default function MedicarePlanCard({
  plan,
  onCompareChange,
  onViewDetails,
  onEnroll,
}: MedicarePlanCardProps) {
  const formatCurrency = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "fill-none text-muted"
            }`}
            data-testid={`star-${star}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="relative hover-elevate" data-testid={`card-plan-${plan.id}`}>
      {plan.recommended === 1 && (
        <div className="absolute -top-3 left-6 z-10">
          <Badge className="bg-primary text-primary-foreground px-3 py-1" data-testid="badge-recommended">
            RECOMMENDED
          </Badge>
        </div>
      )}

      <div className="absolute top-6 right-6 z-10">
        <CircularProgress percentage={plan.matchScore} size={96} strokeWidth={9} />
      </div>

      <CardHeader className="pb-3 pr-32">
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-card-foreground leading-tight" data-testid="text-plan-name">
              {plan.planName}
            </h3>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {renderStars(plan.starRating)}
              <span className="text-sm text-muted-foreground">{plan.year}</span>
              <span className="text-sm text-muted-foreground">{plan.carrier}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Monthly Premium
            </span>
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="text-4xl font-bold text-primary" data-testid="text-premium">
            {formatCurrency(plan.monthlyPremium)}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Medical Deductible</span>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="text-base font-semibold" data-testid="text-medical-deductible">
              {formatCurrency(plan.medicalDeductible)}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Out of Pocket Health Max</span>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="text-base font-semibold" data-testid="text-out-of-pocket">
              {formatCurrency(plan.outOfPocketMax)}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Rx Drug Deductible</span>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="text-base font-semibold" data-testid="text-rx-deductible">
              {formatCurrency(plan.rxDrugDeductible)}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated Annual Rx Drug Cost</span>
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="text-base font-semibold" data-testid="text-annual-rx-cost">
              {formatCurrency(plan.estimatedAnnualRxCost)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <Pill className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {plan.pharmaciesCovered} of {plan.pharmaciesCovered} Pharmacies Covered
            </span>
          </div>
          {plan.doctorName && (
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium" data-testid="text-doctor-name">
                {plan.doctorName}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3 pt-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`compare-${plan.id}`}
            onCheckedChange={onCompareChange}
            data-testid="checkbox-compare"
          />
          <label
            htmlFor={`compare-${plan.id}`}
            className="text-sm text-foreground cursor-pointer"
          >
            Compare
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onViewDetails}
            data-testid="button-view-details"
          >
            View Plan Details
          </Button>
          <Button onClick={onEnroll} data-testid="button-enroll">
            Enroll
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
