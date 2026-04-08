import { useState, useCallback } from "react";
import PLZScreen from "@/components/PLZScreen";
import FoodFeed from "@/components/FoodFeed";
import TopBar from "@/components/TopBar";
import HamburgerMenu from "@/components/HamburgerMenu";
import SurpriseOverlay from "@/components/SurpriseOverlay";
import OrderSheet from "@/components/OrderSheet";
import ProfilePage from "@/components/ProfilePage";
import CommentsSheet from "@/components/CommentsSheet";
import { foodPosts } from "@/data/mockData";
import type { FoodPost } from "@/data/mockData";

type AppState = "plz" | "feed";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("plz");
  const [city, setCity] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [surprisePost, setSurprisePost] = useState<FoodPost | null>(null);
  const [orderPost, setOrderPost] = useState<FoodPost | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [commentsPost, setCommentsPost] = useState<FoodPost | null>(null);
  const [userComments, setUserComments] = useState<Record<string, { text: string; dish: string }[]>>({});

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

  const handleLike = useCallback((id: string) => {
    setLikedIds((prev) => {
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

  const handleAddComment = useCallback((postId: string, text: string) => {
    const post = foodPosts.find((p) => p.id === postId);
    setUserComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { text, dish: post?.dish || "" }],
    }));
  }, []);

  const savedItems = foodPosts.filter((p) => savedIds.has(p.id));

  if (appState === "plz") {
    return <PLZScreen onComplete={handlePLZComplete} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-foreground">
      <TopBar city={city} onMenuOpen={() => setMenuOpen(true)} />
      <FoodFeed
        posts={foodPosts}
        savedIds={savedIds}
        likedIds={likedIds}
        onSave={handleSave}
        onLike={handleLike}
        onOrder={setOrderPost}
        onComments={setCommentsPost}
      />
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        savedItems={savedItems}
        onSurprise={handleSurprise}
        onProfile={() => setProfileOpen(true)}
        city={city}
      />
      {surprisePost && (
        <SurpriseOverlay post={surprisePost} onClose={() => setSurprisePost(null)} />
      )}
      {orderPost && (
        <OrderSheet post={orderPost} onClose={() => setOrderPost(null)} />
      )}
      {commentsPost && (
        <CommentsSheet
          post={commentsPost}
          isOpen={!!commentsPost}
          onClose={() => setCommentsPost(null)}
          comments={[]}
          onAddComment={handleAddComment}
        />
      )}
      <ProfilePage
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        savedItems={savedItems}
        likedIds={likedIds}
        allPosts={foodPosts}
        comments={userComments}
      />
    </div>
  );
};

export default Index;
