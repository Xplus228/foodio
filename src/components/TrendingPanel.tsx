import { useState } from "react";
import { X, TrendingUp, Star, Flame, ShoppingCart } from "lucide-react";
import { foodPosts } from "@/data/mockData";
import type { FoodPost } from "@/data/mockData";

interface TrendingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  city: string;
  onAddToCart: (post: FoodPost) => void;
}

const TrendingPanel = ({ isOpen, onClose, city, onAddToCart }: TrendingPanelProps) => {
  if (!isOpen) return null;

  const trending = [...foodPosts].sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0));

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-96 max-w-[90vw] bg-background z-50 animate-slide-in-right shadow-elevated flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Trending in {city}</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-all">
            <X className="w-5 h-5 text-secondary-foreground" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {trending.map((post, i) => (
            <div key={post.id} className="flex gap-3 p-3 rounded-2xl bg-secondary/40 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="relative flex-shrink-0">
                <img src={post.image} alt={post.dish} className="w-20 h-20 rounded-xl object-cover" />
                <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">#{i + 1}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{post.restaurant}</p>
                <p className="font-semibold text-foreground text-sm truncate">{post.dish}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span className="text-xs text-muted-foreground">{post.rating}</span>
                  <Flame className="w-3.5 h-3.5 text-destructive" />
                  <span className="text-xs text-muted-foreground">{post.commentCount} Bestellungen</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-foreground text-sm">{post.price.toFixed(2).replace(".", ",")} €</span>
                  {!post.visitOnly && (
                    <button
                      onClick={() => onAddToCart(post)}
                      className="px-3 py-1.5 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      In den Warenkorb
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrendingPanel;
