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
import { FileText, Download, Mail, Sparkles, CheckCircle, Gift } from "lucide-react";
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
    `This summary will be sent to your email as a detailed PDF with additional information about benefits, coverage details, and next steps for enrollment.`
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
    <div className="space-y-3 text-base leading-relaxed">
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
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setUnlocked(true);
  };

  const handleDownload = () => {
    console.log("Downloading PDF summary for plan:", plan.planName);
    alert("PDF Summary downloaded! (This is a demo - actual PDF generation would happen here)");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            <Gift className="w-8 h-8 text-primary" />
            Get Your FREE Plan Summary
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            Instant access to a comprehensive, easy-to-understand breakdown of this plan
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {!unlocked ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-xl p-6 border-2 border-primary/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Unlock Your Personalized Plan Report
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Get instant access to a detailed PDF summary delivered straight to your inbox. 
                      No credit card required, absolutely free!
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3 bg-white/50 dark:bg-card/50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Complete Coverage Details</p>
                      <p className="text-xs text-muted-foreground">Every benefit explained in plain English</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 bg-white/50 dark:bg-card/50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Cost Breakdown & Savings</p>
                      <p className="text-xs text-muted-foreground">See exactly what you'll pay</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 bg-white/50 dark:bg-card/50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Personalized Recommendations</p>
                      <p className="text-xs text-muted-foreground">Based on your health needs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 bg-white/50 dark:bg-card/50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Network Information</p>
                      <p className="text-xs text-muted-foreground">Doctors & pharmacies near you</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-transparent dark:from-background/80 dark:via-background/60 backdrop-blur-sm rounded-lg flex items-center justify-center z-10 border-2 border-dashed border-primary/30">
                    <div className="text-center space-y-2 p-4">
                      <FileText className="w-12 h-12 text-primary/40 mx-auto" />
                      <p className="text-sm font-medium text-muted-foreground">
                        Enter your email below to unlock
                      </p>
                    </div>
                  </div>
                  
                  <div className="blur-sm opacity-40 bg-white dark:bg-card rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-primary" />
                      <div>
                        <h4 className="font-semibold">{plan.planName}</h4>
                        <p className="text-xs text-muted-foreground">Plan Summary Report • 2026</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                      <div className="h-4 bg-muted rounded w-1/2 mt-3"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pdf-email" className="flex items-center gap-2 text-base font-semibold">
                    <Mail className="w-4 h-4 text-primary" />
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
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    We'll send the PDF to this email instantly. No spam, ever.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    data-testid="button-pdf-cancel"
                    className="order-2 sm:order-1"
                  >
                    Maybe Later
                  </Button>
                  <Button 
                    type="submit" 
                    size="lg"
                    className="order-1 sm:order-2 bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary/90 hover:to-primary/70 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all text-base"
                    data-testid="button-pdf-submit"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get My FREE PDF Now
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                  Check Your Email!
                </h3>
                <p className="text-green-700 dark:text-green-300 text-base">
                  We've sent your personalized plan summary to <span className="font-semibold">{email}</span>
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-3">
                  It should arrive within the next few minutes. Don't forget to check your spam folder!
                </p>
              </div>

              <div className="border rounded-xl p-6 bg-card shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{plan.planName}</h4>
                    <p className="text-sm text-muted-foreground">Plan Summary in Plain English</p>
                  </div>
                </div>
                
                <AnimatedPlanSummary plan={plan} />
              </div>

              <div className="flex justify-between items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  data-testid="button-pdf-close"
                >
                  Close
                </Button>
                <Button 
                  onClick={handleDownload} 
                  size="lg"
                  className="bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary/90 hover:to-primary/70 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all"
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
