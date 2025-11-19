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
import { FileText, Download, Mail, Sparkles, CheckCircle } from "lucide-react";
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
      ? `You'll have access to ${plan.pharmaciesCovered} pharmacy location${plan.pharmaciesCovered > 1 ? 's' : ''} in the network, making it convenient to fill your prescriptions.`
      : `Please note that this plan has limited pharmacy coverage, so you'll want to check if your preferred pharmacy is in network.`,
    plan.doctorName
      ? `Your current doctor, ${plan.doctorName}, is already in this plan's network, so you can continue seeing them without any issues.`
      : `You'll want to verify that your preferred doctors are in this plan's network to avoid out-of-network charges.`,
    `Based on your healthcare needs and preferences, this plan has a ${plan.matchScore}% match score, indicating it's a ${plan.matchScore >= 90 ? 'excellent' : plan.matchScore >= 80 ? 'very good' : 'good'} fit for you.`,
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
    <div className="space-y-3 text-sm leading-relaxed">
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-7 h-7 text-primary" />
            {plan.planName} - Plan Summary
          </DialogTitle>
          <DialogDescription className="text-base">
            Get this comprehensive summary delivered to your inbox
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Attractive Sample PDF Preview */}
          <div className="border-2 border-primary/20 rounded-xl p-6 bg-gradient-to-br from-primary/5 to-transparent shadow-lg">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Your Personalized Plan Summary</h3>
                <p className="text-sm text-muted-foreground">Everything you need to know in plain English</p>
              </div>
            </div>

            <AnimatedPlanSummary plan={plan} />

            <div className="mt-6 pt-5 border-t grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Complete Coverage</p>
                  <p className="text-xs text-muted-foreground">All benefits explained</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Cost Breakdown</p>
                  <p className="text-xs text-muted-foreground">Know what you'll pay</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Network Details</p>
                  <p className="text-xs text-muted-foreground">Doctors & pharmacies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-1">
                      Get Your FREE PDF Report
                    </h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      We'll send this detailed summary to your email instantly. No credit card required, completely free!
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pdf-email" className="text-base font-semibold">
                  Your Email Address
                </Label>
                <Input
                  id="pdf-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  className="h-12 text-base"
                  data-testid="input-pdf-email"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
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
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all"
                  data-testid="button-pdf-submit"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Send Me the PDF
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
                  Check Your Email!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  We've sent your personalized plan summary to <span className="font-semibold">{email}</span>
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  It should arrive within the next few minutes.
                </p>
              </div>

              <div className="flex justify-between items-center gap-3">
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
                  <Download className="w-5 h-5 mr-2" />
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
