import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  ShieldCheck,
  MessageCircle,
  User,
  MessageSquare,
  Infinity,
  UserPlus,
  CheckCircle,
  Zap,
} from "lucide-react";

export default function IntroPage() {
  return (
    <main className="mt-8 bg-background text-foreground flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl xl:max-w-4xl text-center space-y-12">
        {/* Intro */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Create & Chat with AI Characters
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-prose mx-auto">
            Craft unique AI personalities. Make them public or private. Then start chatting. Fast, fun, and yours.
          </p>
        </div>

        {/* Why Section */}
        <Card>
          <CardContent className="p-6 sm:p-8 space-y-6 text-left">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Why Charitra AI?</h2>
              <ul className="text-sm space-y-3">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Create custom AI characters in seconds
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Set them as Public or Private
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Have natural conversations anytime
                </li>
              </ul>
            </div>

            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Demo Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">🔍 Demo Preview</h2>
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-3 text-left text-sm">
              <div className="font-semibold text-base">Character: Sherlock Holmes 🕵️‍♂️</div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-foreground">User: Who are you?</p>
              </div>
              <div className="bg-muted p-3 rounded-lg ml-4 border-l-2 border-primary">
                <p className="text-foreground">
                  Sherlock: I am Sherlock Holmes, the consulting detective. Now, how may I help you solve your mystery?
                </p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-foreground">User: What do you observe about me?</p>
              </div>
              <div className="bg-muted p-3 rounded-lg ml-4 border-l-2 border-primary">
                <p className="text-foreground">
                  Sherlock: Judging by your typing speed and tone, you're curious—yet cautious. Classic.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">💳 Pricing</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Free Plan */}
            <Card>
              <CardContent className="p-6 space-y-4 text-left">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Free Plan
                </h3>
                <p className="text-sm text-muted-foreground font-medium">₹0/month</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    1 Character Creation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    20 Messages / Month
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Access Public Characters
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card>
              <CardContent className="p-6 space-y-4 text-left">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Premium Plan
                </h3>
                <p className="text-sm text-muted-foreground font-medium">₹199/month</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-blue-500" />
                    10 Character Creations
                  </li>
                  <li className="flex items-center gap-2">
                    <Infinity className="w-4 h-4 text-purple-500" />
                    Unlimited Messages
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Early Feature Access
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-10 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Charitra AI. All rights reserved.
        </div>
      </div>
    </main>
  );
}
