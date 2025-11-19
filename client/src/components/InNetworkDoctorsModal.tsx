import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, CheckCircle } from "lucide-react";
import type { MedicarePlan } from "@shared/schema";

interface InNetworkDoctorsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: MedicarePlan;
}

export default function InNetworkDoctorsModal({ open, onOpenChange, plan }: InNetworkDoctorsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">In-Network Doctors</DialogTitle>
          <DialogDescription>
            Healthcare providers covered under {plan.planName}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
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
          
          <div className="flex items-start justify-between p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3 flex-1">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-base">Dr. Emily Rodriguez</p>
                <p className="text-sm text-muted-foreground">Family Medicine</p>
                <p className="text-sm text-muted-foreground mt-1">321 Wellness Boulevard</p>
                <p className="text-sm text-muted-foreground">Your City, ST 12345</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 flex-shrink-0 ml-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">In Network</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t mt-4">
          <Button onClick={() => onOpenChange(false)} data-testid="button-doctors-close">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
