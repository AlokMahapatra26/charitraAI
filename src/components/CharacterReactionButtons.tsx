"use client";

import { useEffect, useState, useRef } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  toggleCharacterReaction,
  getReactionCounts,
  getUserReaction, // 👈 Import this
} from "@/actions/reations";

type Props = {
  characterId: string;
  userId: string;
};

export function CharacterReactionButtons({ characterId, userId }: Props) {
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(null);
  const [counts, setCounts] = useState({ likes: 0, dislikes: 0 });
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchCounts();
    fetchUserReaction(); // 👈 Load reaction on mount
  }, []);

  async function fetchCounts() {
    const data = await getReactionCounts(characterId);
    setCounts(data);
  }

  async function fetchUserReaction() {
    const reaction = await getUserReaction(userId, characterId);
    setUserReaction(reaction);
  }

  function optimisticUpdate(reaction: "like" | "dislike") {
    setCounts((prev) => {
      let likes = prev.likes;
      let dislikes = prev.dislikes;

      if (userReaction === "like") likes--;
      if (userReaction === "dislike") dislikes--;

      if (reaction === "like") likes++;
      if (reaction === "dislike") dislikes++;

      return { likes, dislikes };
    });

    setUserReaction((prev) => (prev === reaction ? null : reaction));
  }

  function debouncedServerUpdate(reaction: "like" | "dislike") {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        const res = await toggleCharacterReaction({ userId, characterId, reaction });
        if (res.status === "removed") {
          setUserReaction(null);
          fetchCounts();
        }
      } catch (err) {
        toast.error("Server error. Reaction not saved.");
      }
    }, 2000);
  }

  function handleReaction(reaction: "like" | "dislike") {
    optimisticUpdate(reaction);
    debouncedServerUpdate(reaction);
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={userReaction === "like" ? "default" : "outline"}
        size="icon"
        onClick={() => handleReaction("like")}
      >
        <ThumbsUp className="h-5 w-5" />
      </Button>
      <span className="text-sm text-muted-foreground">{counts.likes}</span>

      <Button
        variant={userReaction === "dislike" ? "default" : "outline"}
        size="icon"
        onClick={() => handleReaction("dislike")}
      >
        <ThumbsDown className="h-5 w-5" />
      </Button>
      <span className="text-sm text-muted-foreground">{counts.dislikes}</span>
    </div>
  );
}
