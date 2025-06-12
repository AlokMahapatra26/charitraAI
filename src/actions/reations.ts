"use server";

import { db } from "@/db"; // your Drizzle instance
import { characterReactions } from "@/db/schema";
import { and, eq, count, inArray } from "drizzle-orm";

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

export async function getCharacterReactionsWithUserStatus({
  characterId,
  userId,
}: {
  characterId: string;
  userId: string;
}) {
  // Get counts and user reaction in a single query
  const [counts, userReaction] = await Promise.all([
    // Count query
    db.transaction(async (tx) => {
      const [likesResult, dislikesResult] = await Promise.all([
        tx
          .select({ count: count() })
          .from(characterReactions)
          .where(
            and(
              eq(characterReactions.characterId, characterId),
              eq(characterReactions.reaction, "like")
            )
          ),
        tx
          .select({ count: count() })
          .from(characterReactions)
          .where(
            and(
              eq(characterReactions.characterId, characterId),
              eq(characterReactions.reaction, "dislike")
            )
          ),
      ]);
      return {
        likes: Number(likesResult[0]?.count || 0),
        dislikes: Number(dislikesResult[0]?.count || 0),
      };
    }),
    
    // User reaction query
    db
      .select({
        reaction: characterReactions.reaction,
      })
      .from(characterReactions)
      .where(
        and(
          eq(characterReactions.userId, userId),
          eq(characterReactions.characterId, characterId)
        )
      )
      .then((res) => res[0]?.reaction ?? null),
  ]);

  return {
    ...counts,
    userReaction,
  };
}

/**
 * Batch version for multiple characters
 */
export async function getBatchCharacterReactions({
  characterIds,
  userId,
}: {
  characterIds: string[];
  userId: string;
}) {
  if (characterIds.length === 0) return {};

  // Get all counts in one query
  const counts = await db
    .select({
      characterId: characterReactions.characterId,
      reaction: characterReactions.reaction,
      count: count(),
    })
    .from(characterReactions)
    .where(inArray(characterReactions.characterId, characterIds))
    .groupBy(characterReactions.characterId, characterReactions.reaction);

  // Get all user reactions in one query
  const userReactions = await db
    .select({
      characterId: characterReactions.characterId,
      reaction: characterReactions.reaction,
    })
    .from(characterReactions)
    .where(
      and(
        eq(characterReactions.userId, userId),
        inArray(characterReactions.characterId, characterIds)
      )
    );

  // Process into a map
  const result: Record<string, {
    likes: number;
    dislikes: number;
    userReaction: "like" | "dislike" | null;
  }> = {};

  // Initialize all characters
  characterIds.forEach((id) => {
    result[id] = { likes: 0, dislikes: 0, userReaction: null };
  });

  // Apply counts
  counts.forEach((row) => {
    if (row.reaction === "like") {
      result[row.characterId].likes = Number(row.count);
    } else {
      result[row.characterId].dislikes = Number(row.count);
    }
  });

  // Apply user reactions
  userReactions.forEach((row) => {
    result[row.characterId].userReaction = row.reaction;
  });

  return result;
}