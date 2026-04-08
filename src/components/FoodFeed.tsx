import { useRef, useCallback } from "react";
import FoodCard from "./FoodCard";
import type { FoodPost } from "@/data/mockData";

interface FoodFeedProps {
  posts: FoodPost[];
  savedIds: Set<string>;
  onSave: (id: string) => void;
  onOrder: (post: FoodPost) => void;
}

const FoodFeed = ({ posts, savedIds, onSave, onOrder }: FoodFeedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSnapEnd = useCallback(() => {}, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
      onScroll={handleSnapEnd}
    >
      {posts.map((post) => (
        <div key={post.id} className="h-screen w-full">
          <FoodCard
            post={post}
            onSave={onSave}
            isSaved={savedIds.has(post.id)}
            onOrder={onOrder}
          />
        </div>
      ))}
    </div>
  );
};

export default FoodFeed;
