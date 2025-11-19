import { TrendingDown, TrendingUp, AlertCircle, Users, Building2, CheckCircle } from "lucide-react";
import type { PlanChangeImpact } from "@shared/schema";

interface PlanChangeImpactProps {
  impact: PlanChangeImpact;
  planId: string;
}

export default function PlanChangeImpact({ impact, planId }: PlanChangeImpactProps) {
  const hasSavings = impact.yearlySavings > 0;
  const hasLosses = impact.doctorsLost > 0 || impact.pharmaciesLost > 0 || impact.coverageChanges.length > 0;

  if (impact.yearlySavings === 0 && !hasLosses) {
    return null;
  }

  return (
    <div
      className="border-l-4 border-l-primary bg-primary/5 p-4 mx-6 mb-4 rounded-r-lg"
      data-testid={`plan-change-impact-${planId}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {hasSavings ? (
            <div className="bg-green-100 p-2 rounded-full">
              <TrendingDown className="w-5 h-5 text-green-600" />
            </div>
          ) : (
            <div className="bg-orange-100 p-2 rounded-full">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-2">
          <h4 className="font-semibold text-foreground" data-testid={`text-impact-title-${planId}`}>
            {hasSavings ? "Potential Savings" : "Plan Change Impact"}
          </h4>
          
          <div className="space-y-1.5 text-sm">
            {impact.yearlySavings !== 0 && (
              <div className="flex items-center gap-2" data-testid={`text-yearly-savings-${planId}`}>
                {impact.yearlySavings > 0 ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-green-700 font-medium">
                      Switching to this plan may save you approx ${Math.abs(impact.yearlySavings).toLocaleString()}/year
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span className="text-orange-700 font-medium">
                      Switching to this plan may cost you approx ${Math.abs(impact.yearlySavings).toLocaleString()}/year more
                    </span>
                  </>
                )}
              </div>
            )}

            {impact.doctorsLost > 0 && (
              <div className="flex items-center gap-2" data-testid={`text-doctors-lost-${planId}`}>
                <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="text-muted-foreground">
                  But you may lose{" "}
                  <span className="font-medium text-orange-700">
                    {impact.doctorsLost} {impact.doctorsLost === 1 ? "specialist doctor" : "specialist doctors"}
                  </span>
                </span>
              </div>
            )}

            {impact.doctorsGained > 0 && (
              <div className="flex items-center gap-2" data-testid={`text-doctors-gained-${planId}`}>
                <Users className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-muted-foreground">
                  You'll gain access to{" "}
                  <span className="font-medium text-green-700">
                    {impact.doctorsGained} additional {impact.doctorsGained === 1 ? "doctor" : "doctors"}
                  </span>
                </span>
              </div>
            )}

            {impact.pharmaciesLost > 0 && (
              <div className="flex items-center gap-2" data-testid={`text-pharmacies-lost-${planId}`}>
                <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="text-muted-foreground">
                  You may lose coverage at{" "}
                  <span className="font-medium text-orange-700">
                    {impact.pharmaciesLost} {impact.pharmaciesLost === 1 ? "pharmacy" : "pharmacies"}
                  </span>
                </span>
              </div>
            )}

            {impact.pharmaciesGained > 0 && (
              <div className="flex items-center gap-2" data-testid={`text-pharmacies-gained-${planId}`}>
                <Building2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-muted-foreground">
                  You'll gain coverage at{" "}
                  <span className="font-medium text-green-700">
                    {impact.pharmaciesGained} additional {impact.pharmaciesGained === 1 ? "pharmacy" : "pharmacies"}
                  </span>
                </span>
              </div>
            )}

            {impact.coverageChanges.map((change, index) => (
              <div key={index} className="flex items-center gap-2" data-testid={`text-coverage-change-${index}-${planId}`}>
                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-muted-foreground">{change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
