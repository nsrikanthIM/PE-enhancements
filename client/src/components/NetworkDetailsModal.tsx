import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2, User, CheckCircle } from "lucide-react";
import type { MedicarePlan } from "@shared/schema";

interface NetworkDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: MedicarePlan;
}

export default function NetworkDetailsModal({ open, onOpenChange, plan }: NetworkDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Find In-Network Providers</DialogTitle>
          <DialogDescription>
            Doctors and pharmacies covered under {plan.planName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Doctors Section */}
          <div className="border rounded-lg p-5 bg-card">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg">In-Network Doctors</h3>
            </div>
            
            <div className="space-y-3">
              {plan.doctorName && (
                <div className="flex items-start justify-between p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3 flex-1">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-base">{plan.doctorName}</p>
                      <p className="text-sm text-muted-foreground">Primary Care Physician</p>
                      <p className="text-sm text-muted-foreground mt-1">123 Medical Center Drive, Suite 200</p>
                      <p className="text-sm text-muted-foreground">Your City, ST 12345</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400 flex-shrink-0 ml-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold text-sm">In Network</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-start justify-between p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3 flex-1">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-base">Dr. Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Cardiology Specialist</p>
                    <p className="text-sm text-muted-foreground mt-1">456 Heart Health Plaza, Floor 3</p>
                    <p className="text-sm text-muted-foreground">Your City, ST 12345</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 flex-shrink-0 ml-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold text-sm">In Network</span>
                </div>
              </div>
              
              <div className="flex items-start justify-between p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3 flex-1">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-base">Dr. Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Orthopedic Surgeon</p>
                    <p className="text-sm text-muted-foreground mt-1">789 Bone & Joint Center</p>
                    <p className="text-sm text-muted-foreground">Your City, ST 12345</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 flex-shrink-0 ml-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold text-sm">In Network</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pharmacies Section */}
          <div className="border rounded-lg p-5 bg-card">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg">In-Network Pharmacies</h3>
            </div>
            
            <div className="space-y-3">
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
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => onOpenChange(false)} data-testid="button-network-close">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
