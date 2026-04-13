import { useRef, useCallback } from "react";
import FoodCard from "./FoodCard";
import type { FoodPost } from "@/data/mockData";

interface FoodFeedProps {
  posts: FoodPost[];
  savedIds: Set<string>;
  likedIds: Set<string>;
  onSave: (id: string) => void;
  onLike: (id: string) => void;
  onAddToCart: (post: FoodPost) => void;
  onComments: (post: FoodPost) => void;
}

const FoodFeed = ({ posts, savedIds, likedIds, onSave, onLike, onAddToCart, onComments }: FoodFeedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
    >
      {posts.map((post) => (
        <div key={post.id} className="h-screen w-full">
          <FoodCard
            post={post}
            onSave={onSave}
            isSaved={savedIds.has(post.id)}
            isLiked={likedIds.has(post.id)}
            onLike={onLike}
            onAddToCart={onAddToCart}
            onComments={onComments}
          />
        </div>
      ))}
    </div>
  );
};

export default FoodFeed;
