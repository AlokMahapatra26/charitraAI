"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const plans = [
  {
    title: "Free",
    description: "Great for trying it out.",
    price: "₹0/month",
    features: [
      "Create 1 character",
      "20 messages per month",
      "Public characters access",
    ],
    icon: XCircle,
    highlighted: false,
  },
  {
    title: "Premium",
    description: "Unlimited access for creators.",
    price: "₹199/month",
    features: [
      "Create 10 characters",
      "Unlimited messages",
      "Priority access to updates",
    ],
    icon: Zap,
    highlighted: true,
  },
];

const PricingPage = () => {
  const router = useRouter();
  const [showPremiumModal, setShowPremiumModal] = React.useState(false);

  return (
    <>
      <main className="mt-10 px-4 flex flex-col items-center">
        <div className="text-center max-w-2xl space-y-4 mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold">Simple, transparent pricing</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Choose the plan that suits your creativity. Upgrade anytime.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl w-full">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`transition border ${
                plan.highlighted
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-muted"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold">
                    {plan.title}
                  </CardTitle>
                  <plan.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">{plan.price}</div>
                <ul className="text-sm space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  onClick={() => {
                    if (plan.highlighted) {
                      setShowPremiumModal(true);
                    } else {
                      router.push("/");
                    }
                  }}
                >
                  {plan.highlighted ? "Go Premium" : "Start Free"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Premium Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to Premium</DialogTitle>
          </DialogHeader>
          <div className="py-4">
           <p className="text-base">
  Sorry, we haven't implemented an online payment gateway yet.
</p>
<br />
<p className="text-base">
  For now, please send ₹199 to this number: <strong>8849561649</strong> and WhatsApp the payment screenshot along with the payment ID. We will manually upgrade your account within a few hours.
</p>
<br />
<p className="text-xl font-medium">
  Thank you for your support!
</p>



          </div>
          <DialogFooter>
            <Button onClick={() => setShowPremiumModal(false)} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowPremiumModal(false);
              }}
            >
              ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PricingPage;
