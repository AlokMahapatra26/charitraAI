'use client'

import { useTransition, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteCharacterAction } from "@/actions/characters"
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface DeleteCharacterButtonProps {
  characterId: string
  onDeleted?: () => void // optional callback after delete
}

export const DeleteCharacterButton: React.FC<DeleteCharacterButtonProps> = ({
  characterId,
  onDeleted,
}) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCharacterAction(characterId)

      if (result.success) {
        toast.success('Character deleted successfully.')
        setOpen(false)
        onDeleted?.()
      } else {
        toast.error(result.errorMessage || 'Failed to delete character.')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" className='cursor-pointer hover:bg-red-900 '>
          <Trash2 className="w-4 h-4 " />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Character</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this character? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
