'use client'

import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"

interface EditCharacterButtonProps {
  characterId: string
}

export const EditCharacterButton = ({ characterId }: EditCharacterButtonProps) => {
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/character/${characterId}/edit`)
  }

  return (
    <Button 
      onClick={handleEdit}
      variant="outline"
      className="flex items-center gap-2 text-sm"
    >
      <Pencil className="h-4 w-4" />
      
    </Button>
  )
}
