import { useState } from "react";
import { Heart, Clock, Star, ShoppingBag, Flame } from "lucide-react";
import type { FoodPost } from "@/data/mockData";

interface FoodCardProps {
  post: FoodPost;
  onSave: (id: string) => void;
  isSaved: boolean;
}

const FoodCard = ({ post, onSave, isSaved }: FoodCardProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative w-full h-full snap-start snap-always flex-shrink-0">
      {/* Food Image */}
      <div className="absolute inset-0">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-muted animate-shimmer" 
            style={{ backgroundImage: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.05), transparent)", backgroundSize: "200% 100%" }} 
          />
        )}
        <img
          src={post.image}
          alt={post.dish}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between z-10">
        {post.isLimited && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/90 backdrop-blur-sm">
            <Flame className="w-3.5 h-3.5 text-destructive-foreground" />
            <span className="text-xs font-semibold text-destructive-foreground">
              Nur noch {post.limitedCount}!
            </span>
          </div>
        )}
        <div className="ml-auto">
          <button
            onClick={() => onSave(post.id)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all active:scale-90"
          >
            <Heart
              className={`w-5 h-5 transition-all ${isSaved ? "fill-destructive text-destructive scale-110" : "text-primary-foreground"}`}
            />
          </button>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pb-8 z-10">
        {/* Tags */}
        <div className="flex gap-2 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs font-medium glass text-primary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Restaurant name */}
        <p className="text-primary-foreground/70 text-sm font-medium mb-1">
          {post.restaurant}
        </p>

        {/* Dish name */}
        <h2 className="text-primary-foreground text-2xl font-bold mb-1">
          {post.dish}
        </h2>

        {/* Description */}
        <p className="text-primary-foreground/60 text-sm mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-4 text-primary-foreground/70 text-sm">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            {post.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.deliveryTime}
          </span>
        </div>

        {/* Price + Order button */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-black text-primary-foreground">
            {post.price.toFixed(2).replace(".", ",")} €
          </span>
          <button className="flex-1 py-3.5 rounded-2xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-elevated active:scale-[0.97]">
            <ShoppingBag className="w-5 h-5" />
            Jetzt bestellen
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
