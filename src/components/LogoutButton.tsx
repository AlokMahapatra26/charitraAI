"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { logoutAction } from '@/actions/users'

function LogoutButton() {

    const [loading , setloading] = useState(false)
    const router = useRouter()

    const handleLogOut = async () => {
        setloading(true)

        

        const {errorMessage} = await logoutAction()

        if(!errorMessage){
            toast.success("Logout successfully")
            router.push("/login")
        }else{
            toast.error("Error while Logout ", {
                description : errorMessage
            })
        }

        setloading(false)
        console.log("Logging out..")
    }

  return (
    <Button   disabled={loading} variant="outline" onClick={handleLogOut} className='cursor-pointer sm:p-0 p-6'>
        {loading ? <Loader2 className='animate-spin'/> : <LogOut className=''/>} Logout
    </Button>
  )
}

export default LogoutButton