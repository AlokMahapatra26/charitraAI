import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Mail } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="mt-8 flex items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-xl ">
        <CardHeader>
          <h1 className="text-2xl font-bold">About Charitra AI</h1>
          <p className="text-muted-foreground mt-2">
            Charitra AI is a web application where users can create unique AI personalities and chat with them publicly. It blends creativity, conversation, and AI 
            giving life to characters crafted by the community.
          </p>
        </CardHeader>

        <CardContent className="grid gap-4 text-sm leading-relaxed">
          <p>
            This project is open-source and actively maintained. Whether you are here to build your own character, explore others, or just have fun chatting with AI you are part of the story.
          </p>
          <p>
            Built with ❤️ using Next.js, Supabase, and OpenAI API.
          </p>
          <p>
            Made by  <span className="underline"><Link href={"https://github.com/AlokMahapatra26"}>Alok Mahapatra</Link></span> 
          </p>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">© 2025 Charitra AI. All rights reserved.</div>
          <div className="flex gap-3">
            <Link href="https://github.com/AlokMahapatra26/charitraAI" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://x.com/aloktwts" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="mailto:alokmahapatra2604@gmail.com">
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
