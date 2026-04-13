import { useEffect, useState } from "react";
import { Sparkles, X, ShoppingCart } from "lucide-react";
import type { FoodPost } from "@/data/mockData";

interface SurpriseOverlayProps {
  post: FoodPost;
  onClose: () => void;
  onAddToCart: (post: FoodPost) => void;
}

const SurpriseOverlay = ({ post, onClose, onAddToCart }: SurpriseOverlayProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleOrder = () => {
    onAddToCart(post);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-md" onClick={onClose} />
      <div
        className={`relative w-full max-w-sm rounded-3xl overflow-hidden bg-card shadow-elevated transition-all duration-500 ${
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center"
        >
          <X className="w-4 h-4 text-primary-foreground" />
        </button>

        <div className="relative h-64">
          <img src={post.image} alt={post.dish} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full gradient-primary">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-semibold text-primary-foreground">Überraschung!</span>
          </div>
        </div>

        <div className="p-5 -mt-4">
          <p className="text-sm text-muted-foreground font-medium">{post.restaurant}</p>
          <h3 className="text-xl font-bold text-card-foreground mt-1">{post.dish}</h3>
          <p className="text-sm text-muted-foreground mt-2">{post.description}</p>

          <div className="flex items-center justify-between mt-5">
            <span className="text-2xl font-black text-card-foreground">
              {post.price.toFixed(2).replace(".", ",")} €
            </span>
            {!post.visitOnly ? (
              <button
                onClick={handleOrder}
                className="px-6 py-3 rounded-2xl gradient-primary text-primary-foreground font-semibold flex items-center gap-2 transition-all hover:shadow-elevated active:scale-[0.97]"
              >
                <ShoppingCart className="w-4 h-4" />
                In den Warenkorb
              </button>
            ) : (
              <span className="text-sm text-muted-foreground font-medium">Nur vor Ort</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurpriseOverlay;
