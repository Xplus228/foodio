import { X, Award, Star, Crown, Medal } from "lucide-react";
import { foodPosts } from "@/data/mockData";

interface TopRestaurantsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const TopRestaurantsPanel = ({ isOpen, onClose }: TopRestaurantsPanelProps) => {
  if (!isOpen) return null;

  // Deduplicate by restaurant and rank by rating
  const restaurantMap = new Map<string, { name: string; rating: number; image: string; dishes: number; orders: number }>();
  foodPosts.forEach((p) => {
    const existing = restaurantMap.get(p.restaurant);
    if (existing) {
      existing.dishes++;
      existing.orders += p.commentCount || 0;
      existing.rating = Math.max(existing.rating, p.rating);
    } else {
      restaurantMap.set(p.restaurant, { name: p.restaurant, rating: p.rating, image: p.image, dishes: 1, orders: p.commentCount || 0 });
    }
  });
  const restaurants = [...restaurantMap.values()].sort((a, b) => b.rating - a.rating || b.orders - a.orders);

  const tierIcon = (i: number) => {
    if (i === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (i === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (i === 2) return <Medal className="w-5 h-5 text-amber-700" />;
    return <span className="text-sm font-bold text-muted-foreground">#{i + 1}</span>;
  };

  const tierBg = (i: number) => {
    if (i === 0) return "bg-yellow-500/10 border border-yellow-500/30";
    if (i === 1) return "bg-gray-400/10 border border-gray-400/30";
    if (i === 2) return "bg-amber-700/10 border border-amber-700/30";
    return "bg-secondary/40";
  };

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-96 max-w-[90vw] bg-background z-50 animate-slide-in-right shadow-elevated flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Top Restaurants der Woche</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-all">
            <X className="w-5 h-5 text-secondary-foreground" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {restaurants.map((r, i) => (
            <div key={r.name} className={`flex gap-4 p-4 rounded-2xl animate-fade-in ${tierBg(i)}`} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="relative flex-shrink-0">
                <img src={r.image} alt={r.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-background shadow-md flex items-center justify-center">
                  {tierIcon(i)}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">{r.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-semibold text-foreground">{r.rating}</span>
                  <span className="text-xs text-muted-foreground">• {r.orders} Bewertungen</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{r.dishes} Gericht{r.dishes > 1 ? "e" : ""} verfügbar</p>
                {i < 3 && (
                  <div className="mt-2 inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold gradient-primary text-primary-foreground">
                    {i === 0 ? "🥇 Platz 1" : i === 1 ? "🥈 Platz 2" : "🥉 Platz 3"}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopRestaurantsPanel;
