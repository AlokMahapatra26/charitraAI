"use client"

import { toast } from "sonner"
import { CardContent } from "@/components/ui/card"
import { CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useTransition, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { loginAction, signupAction } from "@/actions/users"
import { useRouter } from "next/navigation"

type Props = {
  type: "login" | "signup"
}

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login"
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Refs for login autofill
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const displayName = formData.get("name") as string
      const gender = formData.get("gender") as string
      const age = Number(formData.get("age"))
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      let errorMessage
      let title
      let description

      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage
        title = "Logged in"
        description = "You have been successfully logged in"
      } else {
        errorMessage = (
          await signupAction(email, password, displayName, gender, age)
        ).errorMessage
        title = "Signed up"
        description = "Check your email for a confirmation link"
      }

      if (!errorMessage) {
        toast.success(title, { description })
        router.replace("/")
      } else {
        toast.error("Error", { description: errorMessage })
      }
    })
  }

  const fillDemoCredentials = () => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "anshumansingh1103@gmail.com"
      passwordRef.current.value = "11223344"
    }
  }

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        {!isLoginForm ? (
          <>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                type="text"
                required
                disabled={isPending}
                className="p-6"
              />
            </div>

            <div className="flex justify-between">
              <Select name="gender" required disabled={isPending}>
                <SelectTrigger className="w-full p-6 mr-4">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Others</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex flex-col space-y-1.5">
                <Input
                  id="age"
                  name="age"
                  placeholder="Age"
                  type="number"
                  required
                  disabled={isPending}
                  className="p-6"
                />
              </div>
            </div>
          </>
        ) : null}

        <div className="flex flex-col space-y-1.5">
          <Input
            ref={emailRef}
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={isPending}
            className="p-6"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Input
            ref={passwordRef}
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={isPending}
            className="p-6"
          />
        </div>
      </CardContent>
      <br />

      {isLoginForm && (
        <div className="px-6">
          <Button
            type="button"
            variant="outline"
            onClick={fillDemoCredentials}
            className="text-sm"
          >
            Fill Demo Credentials
          </Button>
          <p className="text-xs opacity-30 my-2 ">email : anshumansingh1103@gmail.com</p>
          <p className="text-xs opacity-30 my-2 ">password : 11223344</p>
        </div>
        
      )}

      

      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full p-6" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : isLoginForm ? "Login" : "Sign Up"}
        </Button>
        <p className="text-xs">
          {isLoginForm ? "Don't have an account yet?" : "Already have an account?"}{" "}
          <Link
            className={`underline text-blue-500 ${isPending ? "pointer-events-none opacity-50" : ""}`}
            href={isLoginForm ? "/signup" : "/login"}
          >
            {isLoginForm ? "Sign up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  )
}

export default AuthForm
