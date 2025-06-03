"use client";

import { useState } from "react"; // Add this
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/DarkModeToggle";
import { Home, User2, Brain, ChartArea, Menu, ArrowRightFromLine, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import LogoutButton from "@/components/LogoutButton";

export const Navbar = ({ user }:any) => {
  const [open, setOpen] = useState(false); // 🔹 Sheet open state

  return (
    <header className="w-full bg-popover text-popover-foreground border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          
          Charitra AI
        </Link>

        {/* Mobile Sheet */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
};


const NavLinks = ({ isMobile, closeSheet }:any) => {
  const pathname = usePathname();

  const handleClick = () => {
    if (isMobile && closeSheet) closeSheet();
  };

  return (
    <div className={`flex ${isMobile ? "flex-col w-full gap-2 p-6" : "flex-wrap items-center gap-2"}`}>
      {[
        { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
        { href: "/user-profile", label: "Profile", icon: <User2 className="w-4 h-4" /> },
        { href: "/character-form", label: "Create Character", icon: <UserPlus className="w-4 h-4" /> },
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

      
       
      

      {isMobile && (
        <div className="block lg:hidden">
          <ModeToggle />
           
           <LogoutButton/>
        

        </div>
      )}
    </div>
  );
};

const MobileMenu = ({ user, closeSheet }:any) => (
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