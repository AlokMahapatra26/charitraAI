"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { DeleteCharacterButton } from "./DeleteCharacterButton";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CharacterCardProps {
  id: string;
  name: string;
  description: string | null;
  avatarUrl: string | null;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  name,
  description,
  avatarUrl,
  
}) => {
  const router = useRouter();

  return (
    <Card className="relative w-full max-w-[200px] h-[280px] p-4 flex flex-col items-center rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Delete Button */}
      <div className="absolute top-2 right-2 z-20">
        <DeleteCharacterButton
          characterId={id}
          onDeleted={() => router.refresh()}
          aria-label={`Delete character ${name}`}
        />
      </div>

      {/* Avatar */}
      <Avatar className="w-14 h-14 mb-3">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={`Avatar of ${name}`} />
        ) : (
          <AvatarFallback>
            <User2 className="w-5 h-5 text-gray-400" />
          </AvatarFallback>
        )}
      </Avatar>

      {/* Name */}
      <h3 className="text-center text-sm font-medium truncate w-full px-2 mb-1">
        {name}
      </h3>

      {/* Description */}
      <p className="text-center text-xs text-muted-foreground line-clamp-3 px-2 mb-3">
        {description ?? (
          <span className="italic opacity-50 select-none">No description.</span>
        )}
      </p>

    
        <Button>Chat</Button>
      
    </Card>
  );
};
