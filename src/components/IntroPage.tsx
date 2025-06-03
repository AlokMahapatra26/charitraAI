import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ShieldCheck, MessageCircle } from "lucide-react";

export default function IntroPage() {
  return (
    <main className="mt-8 bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Create & Chat with AI Characters
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-prose mx-auto">
            Craft unique AI personalities. Make them public or private. Then start chatting. Fast, fun, and yours.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4 text-left">
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

            <Button asChild className="w-full">
              <Link href="/signup">Get Started</Link>
            </Button>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground">
          No coding required. Just bring your imagination.
        </p>
      </div>
    </main>
  );
}
