import { getCharacterByIdAction } from "@/actions/characters";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface CharacterPageProps {
  params: { id: string };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = params;
  const character = await getCharacterByIdAction(id);

  if (!character) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-16 h-16">
          {character.avatarUrl ? (
            <AvatarImage src={character.avatarUrl} alt={character.characterName} />
          ) : (
            <AvatarFallback>
              <User className="w-6 h-6" />
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{character.characterName}</h1>

        </div>
      </div>

      {/* You can replace this with your actual chat component later */}
      <div className="border rounded-lg p-4 text-muted-foreground text-sm">
        <p className="italic">Chat interface for <strong>{character.characterName}</strong> will go here.</p>
      </div>
    </div>
  );
}
