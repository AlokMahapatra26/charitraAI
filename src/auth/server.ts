import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export async function getUser(){
    const {auth} = await createClient();

    const userObject = await auth.getUser();

    if(userObject.error){
        console.log(userObject.error);
        return null;
    }

    return userObject.data.user;
}

export async function getPremiumStatus() {
  const { auth } = await createClient();
  const userObject = await auth.getUser();

  if (userObject.error || !userObject.data.user) return false;
  const dbUser = await db.select().from(users).where(eq(users.id, userObject.data.user.id)).then(rows => rows[0]);

  return dbUser?.isPremium ?? false;
}
