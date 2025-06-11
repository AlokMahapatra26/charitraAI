"use server";

import { db } from "@/db"; // your Drizzle instance
import { characterReactions } from "@/db/schema";
import { and, eq , count} from "drizzle-orm";

/**
 * Toggle like/dislike on a character by a user
 */
export async function toggleCharacterReaction({
  userId,
  characterId,
  reaction,
}: {
  userId: string;
  characterId: string;
  reaction: "like" | "dislike";
}) {
  //  Check if reaction already exists
  const [existing] = await db
    .select()
    .from(characterReactions)
    .where(
      and(
        eq(characterReactions.userId, userId),
        eq(characterReactions.characterId, characterId)
      )
    );

  if (!existing) {
    // Insert new reaction
    await db.insert(characterReactions).values({
      userId,
      characterId,
      reaction,
    });
    return { status: "added" };
  }

  if (existing.reaction === reaction) {
    await db
      .delete(characterReactions)
      .where(eq(characterReactions.id, existing.id));
    return { status: "removed" };
  }

  // Update existing reaction with new type
  await db
    .update(characterReactions)
    .set({ reaction })
    .where(eq(characterReactions.id, existing.id));

  return { status: "updated" };
}


export async function getReactionCounts(characterId: string) {
  // Count likes
  const [likesResult] = await db
    .select({ count: count() })
    .from(characterReactions)
    .where(
      and(
        eq(characterReactions.characterId, characterId),
        eq(characterReactions.reaction, "like")
      )
    );

  // Count dislikes
  const [dislikesResult] = await db
    .select({ count: count() })
    .from(characterReactions)
    .where(
      and(
        eq(characterReactions.characterId, characterId),
        eq(characterReactions.reaction, "dislike")
      )
    );

  return {
    likes: Number(likesResult.count),
    dislikes: Number(dislikesResult.count),
  };
}

export async function getUserReaction(userId: string, characterId: string) {
  const [reaction] = await db
    .select({
      reaction: characterReactions.reaction,
    })
    .from(characterReactions)
    .where(
      and(
        eq(characterReactions.userId, userId),
        eq(characterReactions.characterId, characterId)
      )
    );

  return reaction?.reaction ?? null;
}