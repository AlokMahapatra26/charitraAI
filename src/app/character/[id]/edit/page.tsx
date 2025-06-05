'use client'

import { useEffect, useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { editCharacterByIdAction, getCharacterByIdAction } from '@/actions/characters'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function EditCharacterPage() {
  const params = useParams()
  const characterId = params.id as string
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  useEffect(() => {
    const fetchCharacter = async () => {
      const char = await getCharacterByIdAction(characterId)
      if (!char) {
        toast.error("Character not found")
        router.push("/user-profile")
        return
      }
      setName(char.characterName)
      setDescription(char.characterDescription ?? '')
      setAvatarUrl(char.avatarUrl ?? '')
      setIsPublic(char.isPublic)
      setLoading(false)
    }

    fetchCharacter()
  }, [characterId, router])

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const name = formData.get('characterName') as string
      const description = formData.get('characterDescription') as string
      const avatarUrl = formData.get('avatarUrl') as string
      const isPublic = formData.get('isPublic') === 'on'

      const response = await editCharacterByIdAction(characterId, name, description, avatarUrl, isPublic)

      if (response?.errorMessage) {
        toast.error("Error", { description: response.errorMessage })
      } else {
        toast.success("Character updated", { description: "Changes have been saved." })
        router.push('/user-profile')
      }
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading character...</span>
      </div>
    )
  }

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full max-w-full sm:max-w-[500px] sm:min-w-[500px] mx-auto gap-4 mb-8">
        <h1 className="text-2xl font-bold mb-2">Edit Character</h1>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="characterName">Character Name</Label>
          <Input
            id="characterName"
            name="characterName"
            placeholder="E.g. Shadowblade"
            required
            disabled={isPending}
            defaultValue={name}
            className="p-6"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="characterDescription">Description</Label>
          <Textarea
            id="characterDescription"
            name="characterDescription"
            placeholder="Write something interesting about your character..."
            required
            disabled={isPending}
            defaultValue={description}
            className="p-6"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="avatarUrl">Avatar URL</Label>
          <Input
            id="avatarUrl"
            name="avatarUrl"
            type="url"
            placeholder="https://example.com/avatar.png"
            disabled={isPending}
            defaultValue={avatarUrl}
            className="p-6"
          />
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <Switch
            id="isPublic"
            name="isPublic"
            disabled={isPending}
            defaultChecked={isPublic}
          />
          <Label htmlFor="isPublic">Make Character Public</Label>
        </div>

        <div className="w-full sm:w-auto">
    <Button
      type="submit"
      disabled={isPending}
      className="w-full  p-6 text-sm"
    >
      {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : 'Save Changes'}
    </Button>
  </div>
      </CardContent>

   

    


      
    </form>
  )
}
