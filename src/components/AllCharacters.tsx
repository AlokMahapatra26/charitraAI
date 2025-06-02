import React from "react";
import { getAllPublicCharactersAction } from "@/actions/characters"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Sparkles } from "lucide-react";
import Link from "next/link";

const AllCharacters = async () => {
  const { characters, errorMessage } = await getAllPublicCharactersAction();

  if (errorMessage) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load characters: {errorMessage}
      </div>
    );
  }

  if (!characters || characters.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <div className="text-6xl mb-2">🤷‍♂️</div>
        <p className="text-lg font-semibold">No public characters found</p>
        <p className="text-sm text-muted-foreground">
          Characters shared by users will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2 opacity-70">
        <Sparkles className="w-5 h-5" />
        Public Characters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((char) => (
          <Card
            key={char.id}
            className="hover:shadow-lg transition-transform duration-200 hover:scale-[1.02]"
          >
            <CardHeader className="flex items-center gap-4">
              <Avatar className="w-10 h-10">
                {char.avatarUrl ? (
                  <AvatarImage src={char.avatarUrl} alt={char.characterName} />
                ) : (
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <CardTitle className="text-lg">{char.characterName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {char.characterDescription || "No description provided."}
              </p>
              <div className="text-xs text-gray-400 mt-2">
                ❤️ {char.likes} Likes
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllCharacters;
