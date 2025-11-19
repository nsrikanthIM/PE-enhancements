import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Mail, CheckCircle } from "lucide-react";
import type { MedicarePlan } from "@shared/schema";

interface PdfSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: MedicarePlan;
}

function AnimatedPlanSummary({ plan }: { plan: MedicarePlan }) {
  const [visibleLines, setVisibleLines] = useState(0);

  const summaryLines = [
    `This is the ${plan.planName}, a ${plan.starRating}-star rated Medicare plan offered by ${plan.carrier}.`,
    `Your monthly premium would be just $${plan.monthlyPremium}, which is what you'll pay each month to keep this coverage active.`,
    `The medical deductible is $${plan.medicalDeductible}, meaning that's the amount you'd pay out of pocket before the plan starts covering your medical expenses.`,
    `Your maximum out-of-pocket cost is capped at $${plan.outOfPocketMax} per year, so you'll never pay more than that for covered services.`,
    plan.rxDrugDeductible && parseFloat(plan.rxDrugDeductible) > 0
      ? `For prescription drugs, there's a deductible of $${plan.rxDrugDeductible} before your medication coverage kicks in.`
      : `Great news - this plan includes prescription drug coverage with no separate deductible.`,
    plan.pharmaciesCovered > 0
      ? `You'll have access to ${plan.pharmaciesCovered} pharmacy location${plan.pharmaciesCovered > 1 ? 's' : ''} in the network.`
      : `Please note that this plan has limited pharmacy coverage.`,
    plan.doctorName
      ? `Your current doctor, ${plan.doctorName}, is already in this plan's network.`
      : `You'll want to verify that your preferred doctors are in this plan's network.`,
    `Based on your healthcare needs, this plan has a ${plan.matchScore}% match score.`,
  ];

  useEffect(() => {
    if (visibleLines < summaryLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, summaryLines.length]);

  useEffect(() => {
    setVisibleLines(0);
  }, [plan.id]);

  return (
    <div className="space-y-2 text-sm leading-relaxed max-h-60 overflow-y-auto">
      {summaryLines.map((line, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ${
            index < visibleLines
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${index * 50}ms`
          }}
        >
          <p className="text-foreground">
            {line}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function PdfSummaryModal({ open, onOpenChange, plan }: PdfSummaryModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setIsSubmitted(true);
  };

  const handleDownload = () => {
    console.log("Downloading PDF summary for plan:", plan.planName);
    alert("PDF Summary downloaded! (This is a demo - actual PDF generation would happen here)");
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {plan.planName} - Plan Summary
          </DialogTitle>
          <DialogDescription>
            Get the complete details in your inbox
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {!isSubmitted ? (
            <>
              {/* Email Form at Top */}
              <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4 bg-primary/5">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-base">Enter your email to get PDF summary</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdf-email" className="text-sm">
                    Email Address
                  </Label>
                  <Input
                    id="pdf-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@example.com"
                    className="h-11"
                    data-testid="input-pdf-email"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    data-testid="button-pdf-cancel"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold"
                    data-testid="button-pdf-submit"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Send Me the PDF
                  </Button>
                </div>
              </form>

              {/* Plan Summary Below */}
              <div className="border rounded-lg p-4 bg-card">
                <h4 className="font-semibold text-sm mb-3">Plan Summary Preview:</h4>
                <AnimatedPlanSummary plan={plan} />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-2 border-green-200 dark:border-green-800 rounded-lg p-5 text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
                  Check Your Email!
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  We've sent your plan summary to <span className="font-semibold">{email}</span>
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  data-testid="button-pdf-close"
                >
                  Close
                </Button>
                <Button 
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold"
                  data-testid="button-pdf-download"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
