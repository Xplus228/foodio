import { useState, useCallback } from "react";
import PLZScreen from "@/components/PLZScreen";
import FoodFeed from "@/components/FoodFeed";
import TopBar from "@/components/TopBar";
import HamburgerMenu from "@/components/HamburgerMenu";
import SurpriseOverlay from "@/components/SurpriseOverlay";
import OrderSheet from "@/components/OrderSheet";
import { foodPosts } from "@/data/mockData";
import type { FoodPost } from "@/data/mockData";

type AppState = "plz" | "feed";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("plz");
  const [city, setCity] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [surprisePost, setSurprisePost] = useState<FoodPost | null>(null);
  const [orderPost, setOrderPost] = useState<FoodPost | null>(null);

  const handlePLZComplete = useCallback((detectedCity: string) => {
    setCity(detectedCity);
    setAppState("feed");
  }, []);

  const handleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSurprise = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * foodPosts.length);
    setSurprisePost(foodPosts[randomIndex]);
  }, []);

  const savedItems = foodPosts.filter((p) => savedIds.has(p.id));

  if (appState === "plz") {
    return <PLZScreen onComplete={handlePLZComplete} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-foreground">
      <TopBar city={city} onMenuOpen={() => setMenuOpen(true)} />
      <FoodFeed posts={foodPosts} savedIds={savedIds} onSave={handleSave} onOrder={setOrderPost} />
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        savedItems={savedItems}
        onSurprise={handleSurprise}
        city={city}
      />
      {surprisePost && (
        <SurpriseOverlay post={surprisePost} onClose={() => setSurprisePost(null)} />
      )}
      {orderPost && (
        <OrderSheet post={orderPost} onClose={() => setOrderPost(null)} />
      )}
    </div>
  );
};

export default Index;
