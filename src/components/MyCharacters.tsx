
import React from "react";
import { getAllMyCharactersAction } from "@/actions/characters";
import {  ShieldCheck } from "lucide-react";
import { CharacterCard } from "./CharacterCard";

const MyCharacters = async () => {
  const { characters, errorMessage } = await getAllMyCharactersAction();

  if (errorMessage) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading characters: {errorMessage}
      </div>
    );
  }

  if (!characters || characters.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <div className="text-5xl mb-2">🧍‍♂️</div>
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
    <CharacterCard
      key={char.id}
      id={char.id}
      name={char.characterName}
      description={char.characterDescription}
      avatarUrl={char.avatarUrl}
      likes={char.likes}
    />
  ))}
</div>
    </div>
  );
};

export default MyCharacters;
