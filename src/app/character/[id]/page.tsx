import { getCharacterByIdAction } from "@/actions/characters";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import Chat from "@/components/Chat";



export default async function CharacterPage({ params }: { params: { id: string } }) {
  // Fetch character data by ID
  const { id } = await params;
  const character = await getCharacterByIdAction(id);

  if (!character) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
          {character.avatarUrl ? (
            <AvatarImage src={character.avatarUrl} alt={character.characterName} />
          ) : (
            <AvatarFallback>
              <User className="w-6 h-6 sm:w-8 sm:h-8" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col">
  <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
    {character.characterName}
  </h1>
  <p className="mt-1 text-sm text-muted-foreground line-clamp-2 max-w-xs sm:max-w-md">
    {character.characterDescription ?? "No description provided."}
  </p>
  <p className="mt-2 text-xs text-muted-foreground">
    Note: If the character's responses aren't great, it's likely due to how the creator designed it — not the AI itself.
  </p>
</div>

      </div>

      <div className=" rounded-lg p-4 sm:p-6 bg-background ">
        <Chat
          characterId={character.id}
          characterName={character.characterName}
          characterDescription={character.characterDescription ?? "No description provided."}
        />
      </div>
    </div>
  );
}
