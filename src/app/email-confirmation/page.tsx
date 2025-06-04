"use client";

import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function EmailVerifiedPage() {


  return (
    <div className="flex items-center justify-center mt-8 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <CardTitle className="text-2xl mt-2 font-semibold">Email Verified</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground text-sm sm:text-base">
            Your email has been successfully verified. Please close this tab and return to the app to continue using it.
          </p>
        
        </CardContent>
      </Card>
    </div>
  );
}
