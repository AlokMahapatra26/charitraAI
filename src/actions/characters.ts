"use server"

import { handleError } from "@/lib/utils"
import { db } from "@/db"
import { characters } from "@/db/schema"
import { getUser } from "@/auth/server"
import  {and , eq} from "drizzle-orm"
import openai from "@/openai"
import {users} from "@/db/schema"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"

export const addCharacterAction  = async (characterName : string , characterDescription: string , avatarUrl : string , isPublic : boolean) => {
    try{
      const user = await getUser();
      if(!user){
        throw new Error("You must be logged to create character");
      }

      await db.insert(characters).values({
        userId : user.id,
        characterName,
        characterDescription,
        avatarUrl,
        isPublic
      })

      return { errorMessage: null };
    }catch(error){
        handleError(error) 
    }
}



export const getAllPublicCharactersAction = async () => {
  try {
    const result = await db
      .select({
        id: characters.id,
        characterName: characters.characterName,
        characterDescription: characters.characterDescription,
        avatarUrl: characters.avatarUrl,
        userId: characters.userId,
        creatorName: users.name, 
      })
      .from(characters)
      .leftJoin(users, eq(characters.userId, users.id)); 

    return { characters: result, errorMessage: null };
  } catch (error) {
    console.error("Error fetching public characters:", error);
    return { characters: null, errorMessage: "Something went wrong." };
  }
};


export const getAllMyCharactersAction = async () => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in.");

    const result = await db
      .select()
      .from(characters)
      .where(eq(characters.userId, user.id));

    return {
      characters: result,
      errorMessage: null,
    };
  } catch (error) {
    return {
      characters: [],
      errorMessage: handleError(error).errorMessage,
    };
  }
};


export const getCharacterByIdAction = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(characters)
      .where(eq(characters.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Failed to fetch character:", error);
    return null;
  }
};




export const deleteCharacterAction = async (id: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to delete a character.");

    // First, check if character belongs to the user
    const existingCharacter = await db
      .select()
      .from(characters)
      .where(and(eq(characters.userId, user.id), eq(characters.id, id)))
      .limit(1);

    if (!existingCharacter[0]) {
      throw new Error("Character not found or does not belong to the user.");
    }

    // Perform deletion
    await db
      .delete(characters)
      .where(and(eq(characters.userId, user.id), eq(characters.id, id)));

    return {
      success: true,
      errorMessage: null,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: handleError(error).errorMessage,
    };
  }
};



export const askAIAboutNotesAction = async (
  newQuestions: string[],
  responses: string[],
  name: string,
  description: string
) => {
  const user = await getUser();
  if (!user) throw new Error("You must be logged in to ask AI questions");

  const messages: ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: `You are now fully roleplaying as a character named ${name}. ${description}

If the name and description match a real-life person or celebrity, you must speak, think, and behave exactly like them. Use their tone, famous phrases, beliefs, speaking style, and emotional expressions.

Do not say you are an AI. Never break character. Stay in role and respond naturally, as if you are truly ${name}.`,
  },
];


  for (let i = 0; i < newQuestions.length; i++) {
    messages.push({ role: "user", content: newQuestions[i] });
    if (responses[i]) {
      messages.push({ role: "assistant", content: responses[i] });
    }
  } 

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.8,
    messages,
  });

  return completion.choices[0].message.content ?? "An error occurred.";
};

