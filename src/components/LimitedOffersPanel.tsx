import { useState, useEffect } from "react";
import { X, Clock, Flame, ShoppingCart } from "lucide-react";
import { foodPosts } from "@/data/mockData";
import type { FoodPost } from "@/data/mockData";

interface LimitedOffersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (post: FoodPost) => void;
}

const CountdownTimer = ({ endsAt }: { endsAt: number }) => {
  const [remaining, setRemaining] = useState(endsAt - Date.now());

  useEffect(() => {
    const id = setInterval(() => setRemaining(endsAt - Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (remaining <= 0) return <span className="text-xs font-bold text-destructive">Abgelaufen</span>;

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);

  return (
    <div className="flex items-center gap-1">
      {[h, m, s].map((v, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="bg-destructive/10 text-destructive font-mono font-bold text-sm px-1.5 py-0.5 rounded">
            {String(v).padStart(2, "0")}
          </span>
          {i < 2 && <span className="text-destructive font-bold text-xs">:</span>}
        </div>
      ))}
    </div>
  );
};

const LimitedOffersPanel = ({ isOpen, onClose, onAddToCart }: LimitedOffersPanelProps) => {
  if (!isOpen) return null;

  const limitedPosts = foodPosts.filter((p) => p.isLimited);

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-96 max-w-[90vw] bg-background z-50 animate-slide-in-right shadow-elevated flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-destructive" />
            <h2 className="text-lg font-bold text-foreground">Limitierte Angebote</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-all">
            <X className="w-5 h-5 text-secondary-foreground" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {limitedPosts.length === 0 && (
            <p className="text-center text-muted-foreground py-12 text-sm">Keine limitierten Angebote verfügbar</p>
          )}
          {limitedPosts.map((post, i) => (
            <div key={post.id} className="rounded-2xl overflow-hidden bg-secondary/30 border border-destructive/20 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="relative h-32">
                <img src={post.image} alt={post.dish} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/90">
                  <Flame className="w-3 h-3 text-destructive-foreground" />
                  <span className="text-xs font-bold text-destructive-foreground">
                    Nur noch {post.limitedCount}!
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="text-primary-foreground font-bold text-lg">{post.dish}</p>
                  <p className="text-primary-foreground/70 text-xs">{post.restaurant}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-destructive" />
                    <span className="text-xs font-medium text-muted-foreground">Endet in</span>
                  </div>
                  <CountdownTimer endsAt={post.limitedEndsAt || (Date.now() + 3600000 * 2)} />
                </div>
                <div className="w-full bg-border rounded-full h-1.5 mb-3">
                  <div
                    className="bg-destructive h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(100, ((post.limitedCount || 0) / 20) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-foreground">{post.price.toFixed(2).replace(".", ",")} €</span>
                  {!post.visitOnly ? (
                    <button
                      onClick={() => onAddToCart(post)}
                      className="px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      In den Warenkorb
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground font-medium">Nur vor Ort</span>
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

export default LimitedOffersPanel;
