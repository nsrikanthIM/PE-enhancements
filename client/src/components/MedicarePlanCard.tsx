import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Info, Building2, User, Pill, X, FileText } from "lucide-react";
import CircularProgress from "./CircularProgress";
import MatchScoreForm from "./MatchScoreForm";
import PdfSummaryModal from "./PdfSummaryModal";
import PlanChangeImpact from "./PlanChangeImpact";
import type { MedicarePlan, PlanChangeImpact as PlanChangeImpactType } from "@shared/schema";

interface MedicarePlanCardProps {
  plan: MedicarePlan;
  planChangeImpact?: PlanChangeImpactType | null;
  onCompareChange?: (checked: boolean) => void;
  onViewDetails?: () => void;
  onEnroll?: () => void;
}

export default function MedicarePlanCard({
  plan,
  planChangeImpact,
  onCompareChange,
  onViewDetails,
  onEnroll,
}: MedicarePlanCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [scoreUnlocked, setScoreUnlocked] = useState(false);

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
                : star === rating + 1
                ? "fill-yellow-500/50 text-yellow-500"
                : "fill-none text-muted"
            }`}
            data-testid={`star-${star}`}
          />
        ))}
      </div>
    );
  };

  const handleScoreClick = () => {
    if (!scoreUnlocked) {
      setIsFormOpen(true);
    }
  };

  const handleFormClose = (open: boolean) => {
    setIsFormOpen(open);
    if (!open && !scoreUnlocked) {
      setScoreUnlocked(true);
    }
  };

  return (
    <>
      <Card className="relative w-full max-w-[800px] bg-white" data-testid={`card-plan-${plan.id}`}>
        <div className="absolute top-4 right-4 z-10">
          <CircularProgress
            percentage={plan.matchScore}
            size={88}
            strokeWidth={8}
            blurred={!scoreUnlocked}
            onClick={handleScoreClick}
          />
        </div>

        <CardHeader className="pb-4 pr-28">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-normal text-primary leading-tight mb-2" data-testid="text-plan-name">
                {plan.planName}
              </h3>
              <div className="flex items-center gap-3">
                {renderStars(plan.starRating)}
                <span className="text-sm text-muted-foreground">{plan.year}</span>
                <span className="text-sm text-muted-foreground">{plan.carrier}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        {planChangeImpact && <PlanChangeImpact impact={planChangeImpact} />}

        <CardContent className="pt-0">
          <div className="border-t pt-4">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-48 border-r pr-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Monthly Premium</span>
                  <Info className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="text-4xl font-bold text-primary" data-testid="text-premium">
                  {formatCurrency(plan.monthlyPremium)}
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Medical Deductible</span>
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="text-base font-medium" data-testid="text-medical-deductible">
                    {formatCurrency(plan.medicalDeductible)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Out of Pocket Health Max</span>
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="text-base font-medium" data-testid="text-out-of-pocket">
                    {formatCurrency(plan.outOfPocketMax)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Rx Drug Deductible</span>
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="text-base font-medium" data-testid="text-rx-deductible">
                    {plan.rxDrugDeductible === "0" || parseFloat(plan.rxDrugDeductible) === 0
                      ? "No Rx Drug coverage"
                      : formatCurrency(plan.rxDrugDeductible)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {plan.pharmaciesCovered === 0 ? "0" : plan.pharmaciesCovered} of {plan.pharmaciesCovered === 0 ? "1" : plan.pharmaciesCovered} Pharmacies Covered
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                {plan.doctorName ? (
                  <>
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-primary" data-testid="text-doctor-name">
                      {plan.doctorName}
                    </span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Tommy Rose</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm italic">
                <Pill className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {plan.rxDrugDeductible === "0" || parseFloat(plan.rxDrugDeductible) === 0
                    ? "No Rx Drug coverage"
                    : "Rx Drug coverage"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`compare-${plan.id}`}
                onCheckedChange={onCompareChange}
                data-testid="checkbox-compare"
              />
              <label
                htmlFor={`compare-${plan.id}`}
                className="text-sm text-foreground cursor-pointer select-none"
              >
                Compare
              </label>
            </div>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center gap-1.5 text-sm text-primary hover-elevate active-elevate-2 px-2 py-1 rounded-md transition-colors"
              data-testid="button-pdf-summary"
            >
              <FileText className="w-4 h-4" />
              <span>PDF Summary</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary"
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

      <MatchScoreForm open={isFormOpen} onOpenChange={handleFormClose} />
      <PdfSummaryModal open={isPdfModalOpen} onOpenChange={setIsPdfModalOpen} plan={plan} />
    </>
  );
}
