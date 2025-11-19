import { useState } from "react";
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
import { FileText, Download, Mail, Sparkles } from "lucide-react";
import type { MedicarePlan } from "@shared/schema";

interface PdfSummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: MedicarePlan;
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
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            AI-Enhanced Plan Summary
          </DialogTitle>
          <DialogDescription>
            Get a personalized PDF summary of this Medicare plan with AI-powered insights
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {!unlocked ? (
            <div className="space-y-6">
              <div className="relative">
                <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-transparent backdrop-blur-md rounded-lg flex items-center justify-center z-10">
                    <div className="text-center space-y-3 p-6">
                      <div className="flex justify-center">
                        <div className="bg-primary/10 p-4 rounded-full">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        Unlock Your Personalized Summary
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Enter your email to receive an AI-enhanced PDF summary with:
                      </p>
                      <ul className="text-sm text-left text-muted-foreground space-y-1 max-w-md mx-auto">
                        <li>• Complete plan coverage details</li>
                        <li>• Cost breakdown and savings analysis</li>
                        <li>• Personalized recommendations</li>
                        <li>• Doctor and pharmacy network info</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="blur-sm opacity-50 space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold text-lg">{plan.planName}</h4>
                        <p className="text-sm text-muted-foreground">Plan Summary Report</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                      <div className="h-6 bg-muted rounded w-1/2 mt-4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-4/5"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pdf-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="pdf-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@example.com"
                    data-testid="input-pdf-email"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll send the PDF summary to this email address
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    data-testid="button-pdf-cancel"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-pdf-submit">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Summary
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{plan.planName}</h4>
                    <p className="text-sm text-muted-foreground">Plan Summary Report</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <h5 className="font-semibold mb-2">Coverage Overview</h5>
                    <p className="text-muted-foreground">
                      This plan offers comprehensive coverage with a monthly premium of ${plan.monthlyPremium}.
                      Medical deductible is ${plan.medicalDeductible} with an out-of-pocket maximum of ${plan.outOfPocketMax}.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2">Key Benefits</h5>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• {plan.starRating} star rated plan by Medicare</li>
                      <li>• {plan.pharmaciesCovered} pharmacy locations covered</li>
                      {plan.doctorName && <li>• Your doctor {plan.doctorName} is in-network</li>}
                      <li>• Rx Drug coverage included</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2">AI Insights</h5>
                    <p className="text-muted-foreground">
                      Based on your profile, this plan offers excellent value with a {plan.matchScore}% match score.
                      The combination of premium costs and coverage benefits aligns well with your healthcare needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  data-testid="button-pdf-close"
                >
                  Close
                </Button>
                <Button onClick={handleDownload} data-testid="button-pdf-download">
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
