'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { addCharacterAction } from '@/actions/characters';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function AddCharacterForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const name = formData.get('characterName') as string;
      const description = formData.get('characterDescription') as string;
      const avatarUrl = formData.get('avatarUrl') as string;
      const isPublic = formData.get('isPublic') === 'on';

      const response = await addCharacterAction(name, description, avatarUrl, isPublic);

      if (response?.errorMessage) {
        toast.error('Error', { description: response.errorMessage });
      } else {
        toast.success('Character created', { description: 'Your character has been saved.' });
        router.refresh();
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="characterName">Character Name</Label>
          <Input
            id="characterName"
            name="characterName"
            placeholder="E.g. Shadowblade"
            required
            disabled={isPending}
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
            required
            disabled={isPending}
            className="p-6"
          />
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <Switch id="isPublic" name="isPublic" disabled={isPending} />
          <Label htmlFor="isPublic">Make Character Public</Label>
        </div>
      </CardContent>

      <CardFooter className="mt-4 flex-col space-y-4">
        <Button type="submit" disabled={isPending} className="w-full p-6">
          {isPending ? <Loader2 className="animate-spin" /> : 'Create Character'}
        </Button>
      </CardFooter>
    </form>
  );
}
