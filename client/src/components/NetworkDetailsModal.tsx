import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2, User, Pill, CheckCircle, X } from "lucide-react";
import type { MedicarePlan } from "@shared/schema";

interface NetworkDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: MedicarePlan;
}

export default function NetworkDetailsModal({ open, onOpenChange, plan }: NetworkDetailsModalProps) {
  const hasRxCoverage = plan.rxDrugDeductible && parseFloat(plan.rxDrugDeductible) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Network Coverage Details</DialogTitle>
          <DialogDescription>
            Here's what's covered under {plan.planName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Pharmacies Section */}
          <div className="border rounded-lg p-5 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Pharmacies Covered</h3>
                <p className="text-sm text-muted-foreground">
                  {plan.pharmaciesCovered} of {plan.pharmaciesCovered === 0 ? "1" : plan.pharmaciesCovered} locations in network
                </p>
              </div>
            </div>
            
            {plan.pharmaciesCovered > 0 ? (
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">CVS Pharmacy</p>
                    <p className="text-xs text-muted-foreground">123 Main Street, Your City, ST 12345</p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">Open 24/7 • 0.5 miles away</p>
                  </div>
                </div>
                
                {plan.pharmaciesCovered > 1 && (
                  <>
                    <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Walgreens</p>
                        <p className="text-xs text-muted-foreground">456 Oak Avenue, Your City, ST 12345</p>
                        <p className="text-xs text-green-700 dark:text-green-400 mt-1">Mon-Sat 8AM-10PM • 1.2 miles away</p>
                      </div>
                    </div>
                    
                    <div className="text-center py-2">
                      <Button variant="ghost" className="text-primary text-sm">
                        View all {plan.pharmaciesCovered} pharmacies →
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                <X className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-orange-900 dark:text-orange-100">No pharmacy coverage included</p>
                  <p className="text-xs text-orange-700 dark:text-orange-300">You may need to pay out of pocket for prescriptions</p>
                </div>
              </div>
            )}
          </div>

          {/* Doctors Section */}
          <div className="border rounded-lg p-5 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">In-Network Doctors</h3>
                <p className="text-sm text-muted-foreground">
                  Healthcare providers covered by this plan
                </p>
              </div>
            </div>
            
            {plan.doctorName ? (
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{plan.doctorName}</p>
                    <p className="text-xs text-muted-foreground">Primary Care Physician</p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">Accepting new patients</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Dr. Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">Cardiology Specialist</p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">Highly rated • Board certified</p>
                  </div>
                </div>
                
                <div className="text-center py-2">
                  <Button variant="ghost" className="text-primary text-sm">
                    Search all in-network doctors →
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                <X className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-orange-900 dark:text-orange-100">Your current doctor (Tommy Rose) is not in-network</p>
                  <p className="text-xs text-orange-700 dark:text-orange-300">You can search for in-network providers or pay out-of-network rates</p>
                </div>
              </div>
            )}
          </div>

          {/* Prescriptions Section */}
          <div className="border rounded-lg p-5 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-full">
                <Pill className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Prescription Drug Coverage</h3>
                <p className="text-sm text-muted-foreground">
                  Medications covered under this plan
                </p>
              </div>
            </div>
            
            {hasRxCoverage ? (
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">Generic Medications</p>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">Tier 1</span>
                    </div>
                    <p className="text-xs text-muted-foreground">$5-$15 copay after deductible</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">Brand-Name Medications</p>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">Tier 2</span>
                    </div>
                    <p className="text-xs text-muted-foreground">$25-$50 copay after deductible</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">Specialty Medications</p>
                      <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">Tier 3</span>
                    </div>
                    <p className="text-xs text-muted-foreground">30% coinsurance after deductible</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 border border-blue-200 dark:border-blue-800 mt-3">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <span className="font-semibold">Deductible:</span> ${plan.rxDrugDeductible} must be met before coverage begins
                  </p>
                </div>
                
                <div className="text-center py-2">
                  <Button variant="ghost" className="text-primary text-sm">
                    Search drug formulary →
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                <X className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-orange-900 dark:text-orange-100">No prescription drug coverage</p>
                  <p className="text-xs text-orange-700 dark:text-orange-300">This plan does not include Rx benefits. You may need a separate Part D plan.</p>
                </div>
              </div>
            )}
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
