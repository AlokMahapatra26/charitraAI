import React from "react";
import Link from "next/link";
import { getAllPublicCharactersAction } from "@/actions/characters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Sparkles, MessageCircle} from "lucide-react";
import { Button } from "@/components/ui/button";

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
            className="hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] flex flex-col justify-between"
          >
            <div>
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
              <br />
                  <CardContent>
              <p className="text-xs text-muted-foreground mb-1">
                Created by{" "}
                <Link href={`/user/${char.userId}`} className="font-medium  hover:underline">
                  {char.creatorName || "Unknown"}
                </Link>
              </p>
               <p className="text-sm text-muted-foreground mb-3 hidden sm:[display:-webkit-box] sm:line-clamp-3 sm:overflow-hidden sm:text-ellipsis sm:-webkit-box-orient-vertical">
  {char.characterDescription || "No description provided."}
</p>

              





            </CardContent>

            </div>

                  <CardContent className="pt-0 flex justify-between items-center space-x-2">
  <Link href={`/character/${char.id}`} passHref className="flex-1">
    <Button className="w-full mt-2 text-sm" variant="outline">
      <MessageCircle className="w-4 h-4 mr-2" />
      Chat
    </Button>
  </Link>

  {/* <div className="flex items-center mt-2 space-x-1">
    <Button size="icon" variant="outline">
      <Heart className="w-4 h-4" />
    </Button>
    <span className="text-sm text-muted-foreground">12</span>
  </div> */}
</CardContent>

          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllCharacters;
