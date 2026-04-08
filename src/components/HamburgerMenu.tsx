import { useState } from "react";
import { X, TrendingUp, Award, Shuffle, Heart, Clock, User, LogIn, ChevronRight } from "lucide-react";
import type { FoodPost } from "@/data/mockData";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: FoodPost[];
  onSurprise: () => void;
  onProfile: () => void;
  city: string;
}

const HamburgerMenu = ({ isOpen, onClose, savedItems, onSurprise, onProfile, city }: HamburgerMenuProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const menuItems = [
    { icon: TrendingUp, label: "Trending in " + city, id: "trending" },
    { icon: Award, label: "Top Restaurants der Woche", id: "top" },
    { icon: Shuffle, label: "Überrasch mich!", id: "surprise", action: onSurprise },
    { icon: Heart, label: `Gespeichert (${savedItems.length})`, id: "saved" },
    { icon: Clock, label: "Limitierte Angebote", id: "limited" },
    { icon: User, label: "Mein Profil", id: "profile", action: onProfile },
    { icon: LogIn, label: "Anmelden", id: "login" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background z-50 animate-slide-in-right shadow-elevated">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Menü</h2>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center transition-all hover:bg-secondary/80 active:scale-90">
              <X className="w-5 h-5 text-secondary-foreground" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {menuItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                    onClose();
                  } else {
                    setActiveSection(activeSection === item.id ? null : item.id);
                  }
                }}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-foreground hover:bg-secondary/60 transition-all active:scale-[0.98] animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 text-left font-medium">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
          {savedItems.length > 0 && (
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Gespeicherte Gerichte</p>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {savedItems.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden">
                    <img src={item.image} alt={item.dish} className="w-full h-full object-cover" />
                  </div>
                ))}
                {savedItems.length > 4 && (
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                    <span className="text-xs font-bold text-secondary-foreground">+{savedItems.length - 4}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
