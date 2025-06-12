"use client";

import { useEffect, useState, useRef } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  toggleCharacterReaction,
  getCharacterReactionsWithUserStatus,
} from "@/actions/reations";

// Client-side cache that persists across component instances
const reactionCache = new Map<string, {
  likes: number;
  dislikes: number;
  userReaction: "like" | "dislike" | null;
  timestamp: number;
}>();

// Cache validity period (5 minutes)
const CACHE_VALIDITY_MS = 5 * 60 * 1000;

type Props = {
  characterId: string;
  userId: string;
  initialData?: {
    likes: number;
    dislikes: number;
    userReaction: "like" | "dislike" | null;
  };
};

export function CharacterReactionButtons({ characterId, userId, initialData }: Props) {
  const [reactionState, setReactionState] = useState(() => {
    // Check for cached data first
    const cacheKey = `${characterId}-${userId}`;
    const cached = reactionCache.get(cacheKey);
    
    // Use initialData if no cached data exists
    return cached || initialData || { 
      likes: 0, 
      dislikes: 0, 
      userReaction: null 
    };
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(false);

  // Generate cache key
  const cacheKey = `${characterId}-${userId}`;

  // Load data on mount and when visibility changes
  useEffect(() => {
    isMounted.current = true;
    
    // Only fetch if data is stale or doesn't exist
    const cachedData = reactionCache.get(cacheKey);
    if (!cachedData || Date.now() - cachedData.timestamp > CACHE_VALIDITY_MS) {
      fetchReactions();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const cached = reactionCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp > CACHE_VALIDITY_MS) {
          fetchReactions();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      isMounted.current = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [characterId, userId]);

  // Update cache when state changes
  useEffect(() => {
    if (isMounted.current) {
      reactionCache.set(cacheKey, {
        ...reactionState,
        timestamp: Date.now()
      });
    }
  }, [reactionState]);

  const fetchReactions = async () => {
    if (!isMounted.current) return;
    
    setIsLoading(true);
    try {
      const data = await getCharacterReactionsWithUserStatus({ characterId, userId });
      if (isMounted.current) {
        setReactionState(data);
      }
    } catch (error) {
      console.error("Failed to fetch reactions", error);
      toast.error("Failed to load reactions");
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const handleReaction = (reaction: "like" | "dislike") => {
    // Clear any pending debounce
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    
    // Optimistic update
    const currentReaction = reactionState.userReaction;
    let newReaction: typeof currentReaction;
    let likesDelta = 0;
    let dislikesDelta = 0;

    if (currentReaction === reaction) {
      // Toggle off
      newReaction = null;
      likesDelta = reaction === "like" ? -1 : 0;
      dislikesDelta = reaction === "dislike" ? -1 : 0;
    } else {
      // Toggle or switch
      newReaction = reaction;
      if (currentReaction === "like") likesDelta = -1;
      if (currentReaction === "dislike") dislikesDelta = -1;
      if (reaction === "like") likesDelta += 1;
      if (reaction === "dislike") dislikesDelta += 1;
    }

    setReactionState(prev => ({
      likes: prev.likes + likesDelta,
      dislikes: prev.dislikes + dislikesDelta,
      userReaction: newReaction,
    }));

    // Debounce server update
    debounceTimeout.current = setTimeout(async () => {
      try {
        await toggleCharacterReaction({ userId, characterId, reaction });
        // Optionally refresh data after successful update
        // fetchReactions();
      } catch (err) {
        toast.error("Failed to save reaction");
        // Revert to server state on error
        fetchReactions();
      }
    }, 800); // Slightly longer debounce for mobile users
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={reactionState.userReaction === "like" ? "default" : "outline"}
        size="icon"
        onClick={() => handleReaction("like")}
        disabled={isLoading}
        className={`transition-all duration-200 ease-out hover:scale-[1.15] hover:-translate-y-1 hover:-rotate-12 hover:shadow-md hover:bg-blue-100/30 hover:text-blue-600 ${
          reactionState.userReaction === "like" ? "bg-blue-500 text-white" : ""
        }`}
      >
        <ThumbsUp className="h-5 w-5" />
      </Button>

      <span className={`text-sm min-w-[20px] text-center ${
        reactionState.userReaction === "like" ? "text-blue-600 font-medium" : "text-muted-foreground"
      }`}>
        {reactionState.likes}
      </span>

      <Button
        variant={reactionState.userReaction === "dislike" ? "default" : "outline"}
        size="icon"
        onClick={() => handleReaction("dislike")}
        disabled={isLoading}
        className={`transition-all duration-200 ease-out hover:scale-[1.1] hover:-rotate-12 hover:translate-y-1 hover:shadow-md hover:bg-red-100/30 hover:text-red-600 ${
          reactionState.userReaction === "dislike" ? "bg-red-500 text-white" : ""
        }`}
      >
        <ThumbsDown className="h-5 w-5" />
      </Button>

      <span className={`text-sm min-w-[20px] text-center ${
        reactionState.userReaction === "dislike" ? "text-red-600 font-medium" : "text-muted-foreground"
      }`}>
        {reactionState.dislikes}
      </span>
    </div>
  );
}