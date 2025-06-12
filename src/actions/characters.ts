"use server"

import { handleError } from "@/lib/utils"
import { db } from "@/db"
import { characters } from "@/db/schema"
import { getUser } from "@/auth/server"
import  {and , eq , sql , desc} from "drizzle-orm"
import openai from "@/openai"
import {users} from "@/db/schema"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"
import { characterReactions } from "@/db/schema"
import { chatLogs } from "@/db/schema"

export const addCharacterAction  = async (characterName : string , characterDescription: string , avatarUrl : string , isPublic : boolean) => {
    try{
      const user = await getUser();
      if(!user){
        throw new Error("You must be logged to create character");
      }

      
      const userRecord = await db
        .select()
        .from(users)
        .where(eq(users.id, user.id))
        .limit(1);

      if(!userRecord) throw new Error("User not found")

      const isPremium = userRecord[0]?.isPremium;
      
      const createdCount = await db
        .select()
        .from(characters)
        .where(eq(characters.userId , user.id))

      
        const limit = isPremium ? 20 : 1;

        if(createdCount.length >= limit){
          return {errorMessage : `Character creation limit reached. You can create up to ${limit} characters`}
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
        likeCount: sql<number>`COUNT(CASE WHEN ${characterReactions.reaction} = 'like' THEN 1 END)`.as("likeCount"),
      })
      .from(characters)
      .leftJoin(users, eq(characters.userId, users.id))
      .leftJoin(characterReactions, eq(characters.id, characterReactions.characterId))
      .where(eq(characters.isPublic, true))
      .groupBy(characters.id, users.name)
      .orderBy(
        desc(sql`COUNT(CASE WHEN ${characterReactions.reaction} = 'like' THEN 1 END)`)
      );

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

export const editCharacterByIdAction = async (id: string, characterName: string, characterDescription: string, avatarUrl: string, isPublic: boolean) => {
  try {
    await db
      .update(characters)
      .set({
        characterName,
        characterDescription,
        avatarUrl,
        isPublic
      })
      .where(eq(characters.id, id));

    return { errorMessage: null };
  } catch (error) {
    console.error("Failed to update character:", error);
    return { errorMessage: "Something went wrong." };
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


export const aiCharacterAction = async (
  newQuestions: string[],
  responses: string[],
  name: string,
  description: string,
  characterId : string,
) => {
  const user = await getUser();
  if (!user) throw new Error("You must be logged in to ask AI questions");

  const userRecord = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!userRecord || userRecord.length === 0) {
    throw new Error("User not found");
  }

  const isPremium = userRecord[0]?.isPremium;
  const messagesUsed = userRecord[0]?.chatsThisMonth ?? 0;
  const messagesToAdd = newQuestions.length;

  if (!isPremium && messagesUsed + messagesToAdd > 20) {
    throw new Error("Your free tier is over, time to show me the money!");
  }

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are now fully roleplaying as a character named ${name}. ${description}

If the name and description match a real-life person or celebrity, you must speak, think, and behave exactly like them. Use their tone, famous phrases, beliefs, speaking style, and emotional expressions.

Do not say you are an AI. Never break character. Stay in role and respond naturally, as if you are truly ${name}.   dont reply too lengthy, keep your answers concise and to the point.  dont say phrases like "As an AI" or "I am an AI" or "I am a language model" or "I am not a real person" or "I am not capable of feeling emotions". You are ${name} and you are real. and also dont say how can i assist you today, dont say heavy words in the start of the conversation, just start the conversation with a simple greeting or a question related to the topic.`,
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

  const finalResponse = completion.choices[0].message.content ?? "An error occurred.";

  
  await db.insert(chatLogs).values({
  userId: user.id,
  userName: user.user_metadata.displayName ?? "Anonymous", 
  characterId,
  userMessage: newQuestions[newQuestions.length - 1], 
  aiResponse: finalResponse,
});


  
  if (!isPremium) {
    await db
      .update(users)
      .set({ chatsThisMonth: messagesUsed + messagesToAdd })
      .where(eq(users.id, user.id));
  }

  return finalResponse;
};