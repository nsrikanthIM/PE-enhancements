import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, CheckCircle, Edit, TrendingDown } from "lucide-react";
import type { MedicarePlan } from "@shared/schema";

interface CurrentPlanBannerProps {
  currentPlan: MedicarePlan | null;
  onPlanAdded: (plan: MedicarePlan) => void;
}

export default function CurrentPlanBanner({ currentPlan, onPlanAdded }: CurrentPlanBannerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [planName, setPlanName] = useState("");
  const [carrier, setCarrier] = useState("");
  const [monthlyPremium, setMonthlyPremium] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a mock plan based on user input
    const plan: MedicarePlan = {
      id: "current-plan",
      planName,
      carrier,
      year: 2025,
      starRating: 3,
      monthlyPremium: monthlyPremium || "0",
      medicalDeductible: "0",
      outOfPocketMax: "0",
      rxDrugDeductible: "0",
      estimatedAnnualRxCost: "0",
      pharmaciesCovered: 1,
      doctorName: null,
      matchScore: 0,
      recommended: 0,
    };

    onPlanAdded(plan);
    setIsDialogOpen(false);
  };

  if (currentPlan) {
    return (
      <>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Current Plan: {currentPlan.planName}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentPlan.carrier} • ${currentPlan.monthlyPremium}/month
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1.5 rounded-md">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">Viewing potential savings</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(true)}
                data-testid="button-edit-current-plan"
              >
                <Edit className="w-4 h-4 mr-2" />
                Change Plan
              </Button>
            </div>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Your Current Plan</DialogTitle>
              <DialogDescription>
                Enter your current Medicare plan details to compare with other options
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input
                  id="plan-name"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="e.g., AARP Medicare Advantage"
                  data-testid="input-plan-name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carrier">Insurance Carrier</Label>
                <Input
                  id="carrier"
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  placeholder="e.g., UnitedHealthcare"
                  data-testid="input-carrier"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="premium">Monthly Premium ($)</Label>
                <Input
                  id="premium"
                  type="number"
                  step="0.01"
                  value={monthlyPremium}
                  onChange={(e) => setMonthlyPremium(e.target.value)}
                  placeholder="0.00"
                  data-testid="input-premium"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  data-testid="button-cancel-plan"
                >
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-save-plan">
                  Save Plan
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingDown className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                See How Much You Could Save
              </h3>
              <p className="text-sm text-muted-foreground">
                Add your current Medicare plan to compare costs and see potential savings on every plan
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            data-testid="button-add-current-plan"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Current Plan
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Your Current Plan</DialogTitle>
            <DialogDescription>
              Enter your current Medicare plan details to see how much you could save with other options
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="plan-name">Plan Name</Label>
              <Input
                id="plan-name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="e.g., AARP Medicare Advantage"
                data-testid="input-plan-name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carrier">Insurance Carrier</Label>
              <Input
                id="carrier"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                placeholder="e.g., UnitedHealthcare"
                data-testid="input-carrier"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="premium">Monthly Premium ($)</Label>
              <Input
                id="premium"
                type="number"
                step="0.01"
                value={monthlyPremium}
                onChange={(e) => setMonthlyPremium(e.target.value)}
                placeholder="0.00"
                data-testid="input-premium"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                data-testid="button-cancel-plan"
              >
                Cancel
              </Button>
              <Button type="submit" data-testid="button-save-plan">
                Save & Compare
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
