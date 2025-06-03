import { getAllMyCharactersAction } from "@/actions/characters";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, MessageCircle, User } from "lucide-react";

const MyCharacters = async () => {
  const { characters, errorMessage } = await getAllMyCharactersAction();

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
        <div className="text-6xl mb-2">🧍‍♂️</div>
        <p className="text-lg font-semibold">You have no characters yet.</p>
        <p className="text-sm text-muted-foreground">
          Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2 opacity-70">
        <ShieldCheck className="w-5 h-5" />
        My Characters
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
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {char.characterDescription || "No description provided."}
                </p>
              </CardContent>
            </div>

            <CardContent className="pt-0">
              <Link href={`/character/${char.id}`} passHref>
                <Button className="w-full mt-2 text-sm" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCharacters;
