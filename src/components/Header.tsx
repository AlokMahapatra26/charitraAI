import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/DarkModeToggle";
import { getUser } from "@/auth/server";
import { HomeIcon } from "lucide-react";

export default async function Header() {

  const user = await getUser()
  

  return (
    <header className="w-full bg-popover text-popover-foreground shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-lg font-semibold">
          Charitra AI
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-4">
          {user ? (
            <>
                <Button asChild>
                <Link href="/"><HomeIcon/></Link>
                </Button>
                <Button asChild>
                <Link href="/character-form">Create Character</Link>
                </Button>
                <Button asChild>
                <Link href="/user-profile">Profile</Link>
                </Button>
            </>
            

          ) : (
            <>
              <Button asChild>
                <Link href="/signup">Signup</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </nav>

      </div>
    </header>
  );
}

