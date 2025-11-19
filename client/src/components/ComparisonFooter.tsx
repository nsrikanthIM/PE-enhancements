import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ArrowRight, Star } from "lucide-react";
import { useLocation } from "wouter";
import type { MedicarePlan } from "@shared/schema";

interface ComparisonFooterProps {
  plans: MedicarePlan[];
  onRemovePlan: (planId: string) => void;
}

export default function ComparisonFooter({ plans, onRemovePlan }: ComparisonFooterProps) {
  const [, setLocation] = useLocation();

  if (plans.length === 0) return null;

  const formatCurrency = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const renderStars = (rating: number, planId: string) => {
    return (
      <div className="flex items-center gap-0.5" data-testid={`stars-rating-footer-${planId}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "fill-none text-muted"
            }`}
            data-testid={`star-${star}-footer-${planId}`}
          />
        ))}
      </div>
    );
  };

  const handleCompare = () => {
    const planIds = plans.map(p => p.id).join(",");
    setLocation(`/compare?plans=${planIds}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-2xl z-50 animate-in slide-in-from-bottom">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start gap-4">
          <div className="flex-1 flex gap-4 overflow-x-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="flex-shrink-0 w-80 p-4 bg-card relative"
                data-testid={`footer-plan-${plan.id}`}
              >
                <button
                  onClick={() => onRemovePlan(plan.id)}
                  className="absolute top-2 right-2 p-1 hover-elevate active-elevate-2 rounded-full"
                  data-testid={`button-remove-${plan.id}`}
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>

                <div className="space-y-3 pr-6">
                  <div>
                    <h4 className="font-semibold text-sm leading-tight line-clamp-2 mb-2" data-testid={`text-plan-name-footer-${plan.id}`}>
                      {plan.planName}
                    </h4>
                    <div className="flex items-center gap-2">
                      {renderStars(plan.starRating, plan.id)}
                      <span className="text-xs text-muted-foreground" data-testid={`text-carrier-footer-${plan.id}`}>{plan.carrier}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Monthly Premium</span>
                      <span className="font-bold text-primary" data-testid={`text-premium-footer-${plan.id}`}>
                        {formatCurrency(plan.monthlyPremium)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Match Score</span>
                      <span className="font-semibold text-green-600" data-testid={`text-match-score-footer-${plan.id}`}>{plan.matchScore}%</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Out of Pocket Max</span>
                      <span className="font-medium" data-testid={`text-oop-max-footer-${plan.id}`}>{formatCurrency(plan.outOfPocketMax)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Deductible</span>
                      <span className="font-medium" data-testid={`text-deductible-footer-${plan.id}`}>{formatCurrency(plan.medicalDeductible)}</span>
                    </div>

                    {plan.doctorName && (
                      <div className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded" data-testid={`badge-doctor-network-footer-${plan.id}`}>
                        ✓ Your doctor in network
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {plans.length >= 2 && (
            <div className="flex-shrink-0">
              <Button
                size="lg"
                onClick={handleCompare}
                className="shadow-lg"
                data-testid="button-compare-plans-footer"
              >
                Compare Plans
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
