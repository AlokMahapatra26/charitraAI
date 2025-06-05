import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-providers";
import Header from "@/components/Header";
import "@/styles/globals.css"
import { Toaster } from "sonner";
import { Sora } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Charitra AI",
  keywords: ["AI", "characters", "chatbot", "nextjs", "react"],
  description: "Create and interact with AI characters using Charitra AI. Build your own characters, chat with them, and explore a world of imagination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <html lang="en" suppressHydrationWarning>
      <head/>
      <body className={sora.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
             <div className="flex min-h-screen w-full flex-col">
                <Header/>
                <main className="flex flex-1 flex-col px-4 pt-10 xl:px-4">
                  {children}
                </main>
                <Toaster richColors  position="top-center"/>
            </div>
          </ThemeProvider>
      </body>
       
    </html>
    </>
   
  );
}
