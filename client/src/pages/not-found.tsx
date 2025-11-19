import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-xl">
        <CardContent className="pt-8 pb-10 space-y-6">
          <div className="flex items-start gap-3">
            <span className="rounded-full bg-red-50 p-2">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
                404 error
              </p>
              <h1 className="text-2xl font-bold text-gray-900">
                Looks like you’ve followed a broken link or entered a URL that doesn’t exist.
              </h1>
            </div>
          </div>

          <p className="text-base text-gray-600 leading-relaxed">
            Double‑check the link, or use the quick actions below to get back on track. If this keeps
            happening, let the team know so we can fix it.
          </p>

          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
            <li>Return to the home dashboard to start a new search.</li>
            <li>Verify the plan URL you typed or that was shared with you.</li>
            <li>Reach out to support if you think this page should exist.</li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="gap-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go to previous page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
