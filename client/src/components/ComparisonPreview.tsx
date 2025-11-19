import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star, TrendingDown, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import type { MedicarePlan } from "@shared/schema";

interface ComparisonPreviewProps {
  plans: MedicarePlan[];
  onClose: () => void;
}

export default function ComparisonPreview({ plans, onClose }: ComparisonPreviewProps) {
  const [, setLocation] = useLocation();

  if (plans.length < 2) return null;

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
            className={`w-3 h-3 ${
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "fill-none text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleCompareDetail = () => {
    const planIds = plans.map(p => p.id).join(",");
    setLocation(`/compare?plans=${planIds}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Quick Comparison</h2>
            <Button variant="ghost" onClick={onClose} data-testid="button-close-comparison">
              ✕
            </Button>
          </div>
          <p className="text-muted-foreground mt-1">
            Here's a quick overview of your selected plans
          </p>
        </div>

        <div className="p-6">
          <div className={`grid gap-6 ${plans.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {plans.map((plan, index) => (
              <div key={plan.id} className="relative">
                <Card className="p-4 bg-card hover-elevate h-full" data-testid={`comparison-card-${index}`}>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-base leading-tight mb-2 line-clamp-2">
                        {plan.planName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {renderStars(plan.starRating)}
                        <span>{plan.carrier}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Monthly Premium</span>
                        <span className="font-bold text-primary text-lg">
                          {formatCurrency(plan.monthlyPremium)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Match Score</span>
                        <span className="font-semibold text-green-600">{plan.matchScore}%</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Out of Pocket Max</span>
                        <span className="font-medium">{formatCurrency(plan.outOfPocketMax)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Medical Deductible</span>
                        <span className="font-medium">{formatCurrency(plan.medicalDeductible)}</span>
                      </div>

                      {parseFloat(plan.rxDrugDeductible) > 0 && (
                        <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                          <TrendingUp className="w-3 h-3" />
                          <span>Rx Drug Coverage</span>
                        </div>
                      )}

                      {plan.doctorName && (
                        <div className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                          <TrendingDown className="w-3 h-3" />
                          <span>Your doctor in network</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                {index < plans.length - 1 && (
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg animate-pulse">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-3">
            <Button variant="outline" onClick={onClose} data-testid="button-cancel-comparison">
              Cancel
            </Button>
            <Button onClick={handleCompareDetail} size="lg" data-testid="button-compare-detail">
              Compare in Detail
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
