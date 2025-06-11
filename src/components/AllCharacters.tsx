import React from "react";
import Link from "next/link";
import { getAllPublicCharactersAction } from "@/actions/characters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Sparkles, MessageCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CharacterReactionButtons } from "./CharacterReactionButtons";
import { getUser } from "@/auth/server";

const AllCharacters = async () => {
  const { characters, errorMessage } = await getAllPublicCharactersAction();
  const user = await getUser();

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

  
  const sortedCharacters = characters.sort((a, b) => b.likeCount - a.likeCount);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-center sm:justify-end mb-4 lg:hidden">
        <Link href="/character-form" passHref>
          <Button className="text-sm p-6" variant="default">
            <UserPlus className="w-4 h-4 mr-2" />
            Create Character
          </Button>
        </Link>
      </div>

      <div className="mb-4 text-center sm:text-right text-sm text-muted-foreground">
        Total public characters: <span className="font-semibold">{characters.length}</span>
      </div>

      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2 opacity-70">
        <Sparkles className="w-5 h-5" />
        Public Characters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCharacters.map((char) => (
          <Card
            key={char.id}
            className="min-h-[140px] p-4 flex flex-col justify-between shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 flex-1">
              <Avatar className="w-10 h-10 shrink-0">
                {char.avatarUrl ? (
                  <AvatarImage src={char.avatarUrl} alt={char.characterName} />
                ) : (
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex flex-col overflow-hidden">
                <CardTitle className="text-base truncate">{char.characterName}</CardTitle>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 sm:line-clamp-3">
                  {char.characterDescription || "No description provided."}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  Created by{" "}
                  <Link
                    href={`/user/${char.userId}`}
                    className="font-medium hover:underline bg-foreground/10 px-1 rounded"
                  >
                    {char.creatorName || "Unknown"}
                  </Link>
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center justify-between mt-3">
              <Link href={`/character/${char.id}`} passHref>
                <Button
                  className="text-xs px-3 py-1 sm:text-sm sm:px-4 sm:py-2 cursor-pointer"
                  variant="outline"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
              </Link>

              <div className="flex items-center gap-2">

                <CharacterReactionButtons
                  characterId={char.id}
                  userId={user?.id || ""}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllCharacters;
