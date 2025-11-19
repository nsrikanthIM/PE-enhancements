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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Building2, UserPlus, Pill } from "lucide-react";

interface MatchScoreFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MatchScoreForm({ open, onOpenChange }: MatchScoreFormProps) {
  const [coverageType, setCoverageType] = useState("both");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  const [currentCoverage, setCurrentCoverage] = useState("");
  
  const [travelInternational, setTravelInternational] = useState(false);
  const [multipleLocations, setMultipleLocations] = useState(false);
  const [travelOften, setTravelOften] = useState(false);
  const [dontTravelOften, setDontTravelOften] = useState(false);
  
  const [doctorsImportant, setDoctorsImportant] = useState(false);
  const [lowPremiumImportant, setLowPremiumImportant] = useState(false);
  
  const [requestAppointment, setRequestAppointment] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", {
      coverageType,
      firstName,
      lastName,
      email,
      phone,
      address,
      currentCoverage,
      travel: { travelInternational, multipleLocations, travelOften, dontTravelOften },
      priorities: { doctorsImportant, lowPremiumImportant },
      requestAppointment,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get Your Personalized Match Score</DialogTitle>
          <DialogDescription>
            Tell us about yourself to unlock your personalized plan recommendations
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">What type of coverage are you looking for?</Label>
            <RadioGroup value={coverageType} onValueChange={setCoverageType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="life" id="life" data-testid="radio-life" />
                <Label htmlFor="life" className="cursor-pointer font-normal">Life</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="health" id="health" data-testid="radio-health" />
                <Label htmlFor="health" className="cursor-pointer font-normal">Health</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" data-testid="radio-both" />
                <Label htmlFor="both" className="cursor-pointer font-normal">Both</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base font-semibold">Basic Information</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  data-testid="input-first-name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  data-testid="input-last-name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                data-testid="input-email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                data-testid="input-phone"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, City, State ZIP"
                data-testid="input-address"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <button
                  type="button"
                  className="flex items-center gap-2 text-primary hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
                  onClick={() => console.log("Add pharmacy")}
                  data-testid="button-add-pharmacy"
                >
                  <Building2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Add your Pharmacy</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 text-primary hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
                  onClick={() => console.log("Add doctors")}
                  data-testid="button-add-doctors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span className="text-sm font-medium">Add your doctors</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 text-primary hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
                  onClick={() => console.log("Add prescriptions")}
                  data-testid="button-add-prescriptions"
                >
                  <Pill className="w-5 h-5" />
                  <span className="text-sm font-medium">Add your prescriptions</span>
                </button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label htmlFor="currentCoverage" className="text-base font-semibold">
              Tell us about your current coverage
            </Label>
            <Input
              id="currentCoverage"
              value={currentCoverage}
              onChange={(e) => setCurrentCoverage(e.target.value)}
              placeholder="Describe your current insurance coverage..."
              data-testid="input-current-coverage"
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-base font-semibold">How often do you travel?</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="travel-international"
                  checked={travelInternational}
                  onCheckedChange={(checked) => setTravelInternational(checked === true)}
                  data-testid="checkbox-travel-international"
                />
                <Label htmlFor="travel-international" className="cursor-pointer font-normal">
                  I travel internationally often
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="multiple-locations"
                  checked={multipleLocations}
                  onCheckedChange={(checked) => setMultipleLocations(checked === true)}
                  data-testid="checkbox-multiple-locations"
                />
                <Label htmlFor="multiple-locations" className="cursor-pointer font-normal">
                  I live in more than one location
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="travel-often"
                  checked={travelOften}
                  onCheckedChange={(checked) => setTravelOften(checked === true)}
                  data-testid="checkbox-travel-often"
                />
                <Label htmlFor="travel-often" className="cursor-pointer font-normal">
                  I travel often
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dont-travel-often"
                  checked={dontTravelOften}
                  onCheckedChange={(checked) => setDontTravelOften(checked === true)}
                  data-testid="checkbox-dont-travel-often"
                />
                <Label htmlFor="dont-travel-often" className="cursor-pointer font-normal">
                  I don't travel often
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-base font-semibold">Which is more important to you?</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="doctors-important"
                  checked={doctorsImportant}
                  onCheckedChange={(checked) => setDoctorsImportant(checked === true)}
                  data-testid="checkbox-doctors-important"
                />
                <Label htmlFor="doctors-important" className="cursor-pointer font-normal">
                  Doctors
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="low-premium-important"
                  checked={lowPremiumImportant}
                  onCheckedChange={(checked) => setLowPremiumImportant(checked === true)}
                  data-testid="checkbox-low-premium-important"
                />
                <Label htmlFor="low-premium-important" className="cursor-pointer font-normal">
                  Low Premium
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-base font-semibold">Request for an appointment</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="request-appointment"
                checked={requestAppointment}
                onCheckedChange={(checked) => setRequestAppointment(checked === true)}
                data-testid="checkbox-request-appointment"
              />
              <Label htmlFor="request-appointment" className="cursor-pointer font-normal">
                Yes, I would like to request an appointment
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button type="submit" data-testid="button-submit">
              Submit & View Match Score
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
