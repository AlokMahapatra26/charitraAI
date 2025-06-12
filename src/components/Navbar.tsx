"use client";

import { useState } from "react"; // Add this
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/DarkModeToggle";
import { Home, User2,  Menu, UserPlus, Info } from "lucide-react";
import { usePathname } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import LogoutButton from "@/components/LogoutButton";
import { UserMetadata } from "@supabase/supabase-js";
import { IndianRupee } from "lucide-react";

export const Navbar = ({ user }:UserMetadata) => {
  const [open, setOpen] = useState(false); // 🔹 Sheet open state

  return (
    <header className="w-full bg-popover text-popover-foreground border-b shadow-sm      sticky top-0 z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-white/10 shadow-md transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
      
      <Link
  href="/"
  className="flex items-center gap-2 text-xl font-bold tracking-tight group"
>
  <span>Charitra</span>
  <span className="relative inline-block w-10 h-10">
    {/* Animated Orbit Ring */}
    <svg
      className="absolute inset-0 w-full h-full animate-spin-slow text-blue-400/40"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 12"
        strokeLinecap="round"
      />
    </svg>

    {/* Pulsing Dot */}
    <span className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping-slow -translate-x-1/2 -translate-y-1/2" />

    {/* AI Text Core */}
    <span className="relative z-10 text-sm font-semibold text-blue-500 animate-fade-in">
      AI
    </span>
  </span>
</Link>




        {/* Mobile Sheet */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background">
              <SheetTitle asChild>
                <VisuallyHidden>
                  <span>Navigation Menu</span>
                </VisuallyHidden>
              </SheetTitle>
              <MobileMenu user={user} closeSheet={() => setOpen(false)} /> 
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <NavLinks isMobile={false} closeSheet={undefined} />
              <ModeToggle />
            </>
          ) : (
            <>
              <Button asChild><Link href="/signup">Signup</Link></Button>
              <Button asChild variant="outline"><Link href="/login">Login</Link></Button>
              <ModeToggle />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};


interface NavLinksProps {
  isMobile: boolean;
  closeSheet?: () => void;
}

const NavLinks = ({ isMobile, closeSheet }: NavLinksProps) => {
  const pathname = usePathname();

  const handleClick = () => {
    if (isMobile && closeSheet) closeSheet();
  };

  return (
    <div className={`flex ${isMobile ? "flex-col w-full gap-2 p-6" : "flex-wrap items-center gap-2"}`}>
      {[
        { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
        { href: "/character-form", label: "Create Character", icon: <UserPlus className="w-4 h-4" /> },
        { href: "/user-profile", label: "Profile", icon: <User2 className="w-4 h-4" /> },
        { href: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
        { href: "/pricing", label: "Pricing", icon: <IndianRupee className="w-4 h-4" /> },
      ].map(({ href, label, icon }) => (
        <Button
          key={href}
          variant={pathname === href ? "default" : "outline"}
          className={`flex items-center gap-1 ${isMobile ? "w-full justify-start p-6" : ""}`}
          asChild
          onClick={handleClick}
        >
          <Link href={href}>
            {icon} <span>{label}</span>
          </Link>
        </Button>
        
        
      ))}
      
           

      <LogoutButton/>
       
      

      {isMobile && (
        <div className="block lg:hidden">
          <ModeToggle />
           
          
        

        </div>
      )}
    </div>
  );
};

interface MobileMenuProps {
  user: UserMetadata | null;
  closeSheet: () => void;
}

const MobileMenu = ({ user, closeSheet }: MobileMenuProps) => (
  <div className="flex flex-col gap-3 mt-4 w-full">
    {user ? (
      <NavLinks isMobile={true} closeSheet={closeSheet} />
    ) : (
      <div className="p-4">
        <Button asChild className="w-full" onClick={closeSheet}>
          <Link href="/signup">Signup</Link>
        </Button><br /><br />
        <Button asChild variant="outline" className="w-full" onClick={closeSheet}>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    )}
  </div>
);