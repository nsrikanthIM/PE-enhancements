import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Check, X } from "lucide-react";
import type { MedicarePlan } from "@shared/schema";

export default function ComparePage() {
  const [, setLocation] = useLocation();

  // In a real app, we'd fetch these based on URL params
  // For now, using mock data
  const mockPlans: MedicarePlan[] = [
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
          />
        ))}
      </div>
    );
  };

  const comparisonRows: Array<{
    label: string;
    key: keyof MedicarePlan;
    format?: (val: any) => string;
    render?: (val: any) => React.ReactNode;
  }> = [
    { label: "Monthly Premium", key: "monthlyPremium", format: formatCurrency },
    { label: "Star Rating", key: "starRating", render: (val: number) => renderStars(val) },
    { label: "Match Score", key: "matchScore", format: (val: number) => `${val}%` },
    { label: "Medical Deductible", key: "medicalDeductible", format: formatCurrency },
    { label: "Out of Pocket Max", key: "outOfPocketMax", format: formatCurrency },
    { label: "Rx Drug Deductible", key: "rxDrugDeductible", format: formatCurrency },
    { label: "Annual Rx Drug Cost", key: "estimatedAnnualRxCost", format: formatCurrency },
    { label: "Pharmacies Covered", key: "pharmaciesCovered", format: (val: number) => val.toString() },
    { 
      label: "Your Doctor In Network", 
      key: "doctorName", 
      render: (val: string | null) => val ? <Check className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-muted-foreground" />
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plans
          </Button>
          <h1 className="text-3xl font-bold">Detailed Plan Comparison</h1>
          <p className="text-muted-foreground mt-1">
            Side-by-side comparison of your selected Medicare plans
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="comparison-table">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold w-64">Feature</th>
                  {mockPlans.map((plan) => (
                    <th key={plan.id} className="text-left p-4 font-semibold min-w-[250px]">
                      <div className="space-y-2">
                        <div className="font-semibold text-base">{plan.planName}</div>
                        <div className="text-sm text-muted-foreground font-normal">
                          {plan.carrier} • {plan.year}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.key}
                    className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                  >
                    <td className="p-4 font-medium">{row.label}</td>
                    {mockPlans.map((plan) => {
                      const value = plan[row.key as keyof MedicarePlan];
                      return (
                        <td key={plan.id} className="p-4">
                          {row.render
                            ? row.render(value as any)
                            : row.format
                            ? row.format(value as any)
                            : value?.toString() || "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex justify-center gap-4 mt-8">
          {mockPlans.map((plan) => (
            <Button key={plan.id} size="lg" data-testid={`button-enroll-${plan.id}`}>
              Enroll in {plan.carrier}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
}
