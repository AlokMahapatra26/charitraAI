"use server"

import { createClient } from "@/auth/server"
import { handleError } from "@/lib/utils"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"


export const signupAction = async (email : string, password : string , displayName : string , gender : string , age : number) => {
    try{
        const {auth} = await createClient()

        const {data , error} = await auth.signUp({
            email,
            password,
            options :{
                data :{
                    displayName,
                    gender,
                    age
                }
            } 
        })

        if(error) throw error

        const userId = data.user?.id;
        console.log(userId)

        if(!userId) throw new Error("Error signing up");

       const result = await db.insert(users).values({
  id: userId,
  name: displayName,
  email,
  gender,
  age
});



        return {errorMessage : null}

    }catch(error){
        return handleError(error)
    }
}


export const loginAction = async(email : string , password : string) => {
    try{
        const {auth} = await createClient();

        const {error} = await auth.signInWithPassword({
            email , 
            password,
        })

        if(error) throw error

        return {errorMessage : null}
    }catch(error){
        return handleError(error)
    }
}

export const logoutAction = async () => {
    try{
        const {auth} = await createClient();

        const {error} = await auth.signOut()

        if(error){
            throw error
        }

        return {errorMessage : null}
    }catch(error){
        return handleError(error)
    }
}

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  createdAt: Date | string | null; // ✅ Allow null
}



export const getUserAction = async (id: string): Promise<User | null> => {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};