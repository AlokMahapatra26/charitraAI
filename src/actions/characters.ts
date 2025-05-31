"use server"

import { handleError } from "@/lib/utils"
import { db } from "@/db"
import { characters } from "@/db/schema"
import { getUser } from "@/auth/server"
import  {and , eq} from "drizzle-orm"

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



export const getSingleCharacterAction = async (id : string) => {
    try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to add journal");

    const singleCharacter = await db   
        .select()
        .from(characters)
        .where(
            and(
                eq(characters.userId, user.id),
                eq(characters.id , id)
            )
        )
        .limit(1)
    return {
      singleCharacter: singleCharacter[0] || null,
      errorMessage: null
    }
  } catch (error) {
    return {
      singleCharacter: null,
      errorMessage: handleError(error).errorMessage
    };
  }
}

export const getAllPublicCharactersAction = async (id : string) => {
    try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to add journal");

    const singleCharacter = await db   
        .select()
        .from(characters)
        .where(
            and(
                eq(characters.userId, user.id),
                eq(characters.id , id)
            )
        )
        .limit(1)
    return {
      singleCharacter: singleCharacter[0] || null,
      errorMessage: null
    }
  } catch (error) {
    return {
      singleCharacter: null,
      errorMessage: handleError(error).errorMessage
    };
  }
}

export const getAllMyCharacterAction = async (id : string) => {
    try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to add journal");

    const singleCharacter = await db   
        .select()
        .from(characters)
        .where(
            and(
                eq(characters.userId, user.id),
                eq(characters.id , id)
            )
        )
        .limit(1)
    return {
      singleCharacter: singleCharacter[0] || null,
      errorMessage: null
    }
  } catch (error) {
    return {
      singleCharacter: null,
      errorMessage: handleError(error).errorMessage
    };
  }
}

export const deleteCharacterAction = async (id : string) => {
    try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to add journal");

    const singleCharacter = await db   
        .select()
        .from(characters)
        .where(
            and(
                eq(characters.userId, user.id),
                eq(characters.id , id)
            )
        )
        .limit(1)
    return {
      singleCharacter: singleCharacter[0] || null,
      errorMessage: null
    }
  } catch (error) {
    return {
      singleCharacter: null,
      errorMessage: handleError(error).errorMessage
    };
  }
}