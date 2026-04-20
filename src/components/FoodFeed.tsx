import { useRef, useState, useEffect, useCallback } from "react";
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
  const [visibleId, setVisibleId] = useState<string>(posts[0]?.id || "");
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const id = entry.target.getAttribute("data-post-id");
            if (id) setVisibleId(id);
          }
        });
      },
      { threshold: 0.5 }
    );

    itemRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [posts]);

  const setRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) itemRefs.current.set(id, el);
    else itemRefs.current.delete(id);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
    >
      {posts.map((post) => (
        <div
          key={post.id}
          className="h-screen w-full"
          data-post-id={post.id}
          ref={(el) => setRef(post.id, el)}
        >
          <FoodCard
            post={post}
            onSave={onSave}
            isSaved={savedIds.has(post.id)}
            isLiked={likedIds.has(post.id)}
            onLike={onLike}
            onAddToCart={onAddToCart}
            onComments={onComments}
            isVisible={visibleId === post.id}
          />
        </div>
      ))}
    </div>
  );
};

export default FoodFeed;
