import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle } from "lucide-react";
import type { MedicarePlan } from "@shared/schema";

interface InNetworkPharmaciesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: MedicarePlan;
}

export default function InNetworkPharmaciesModal({ open, onOpenChange, plan }: InNetworkPharmaciesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">In-Network Pharmacies</DialogTitle>
          <DialogDescription>
            Pharmacy locations covered under {plan.planName}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          <div className="flex items-start justify-between p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3 flex-1">
              <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-base">CVS Pharmacy</p>
                <p className="text-sm text-muted-foreground mt-1">123 Main Street</p>
                <p className="text-sm text-muted-foreground">Your City, ST 12345</p>
                <p className="text-xs text-muted-foreground mt-1">Open 24/7 • 0.5 miles away</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 flex-shrink-0 ml-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">In Network</span>
            </div>
          </div>
          
          <div className="flex items-start justify-between p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3 flex-1">
              <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-base">Walgreens</p>
                <p className="text-sm text-muted-foreground mt-1">456 Oak Avenue</p>
                <p className="text-sm text-muted-foreground">Your City, ST 12345</p>
                <p className="text-xs text-muted-foreground mt-1">Mon-Sat 8AM-10PM • 1.2 miles away</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 flex-shrink-0 ml-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">In Network</span>
            </div>
          </div>
          
          <div className="flex items-start justify-between p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3 flex-1">
              <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-base">Rite Aid Pharmacy</p>
                <p className="text-sm text-muted-foreground mt-1">789 Elm Street Plaza</p>
                <p className="text-sm text-muted-foreground">Your City, ST 12345</p>
                <p className="text-xs text-muted-foreground mt-1">Daily 9AM-9PM • 2.0 miles away</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 flex-shrink-0 ml-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">In Network</span>
            </div>
          </div>
          
          <div className="flex items-start justify-between p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3 flex-1">
              <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-base">Target Pharmacy</p>
                <p className="text-sm text-muted-foreground mt-1">555 Shopping Center Way</p>
                <p className="text-sm text-muted-foreground">Your City, ST 12345</p>
                <p className="text-xs text-muted-foreground mt-1">Daily 9AM-7PM • 1.8 miles away</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 flex-shrink-0 ml-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">In Network</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t mt-4">
          <Button onClick={() => onOpenChange(false)} data-testid="button-pharmacies-close">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
