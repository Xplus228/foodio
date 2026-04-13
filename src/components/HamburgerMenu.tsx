import { useState } from "react";
import { X, TrendingUp, Award, Shuffle, Clock, LogIn, ChevronRight } from "lucide-react";
import type { FoodPost } from "@/data/mockData";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSurprise: () => void;
  onTrending: () => void;
  onTopRestaurants: () => void;
  onLimitedOffers: () => void;
  city: string;
}

const HamburgerMenu = ({ isOpen, onClose, onSurprise, onTrending, onTopRestaurants, onLimitedOffers, city }: HamburgerMenuProps) => {
  if (!isOpen) return null;

  const menuItems = [
    { icon: TrendingUp, label: "Trending in " + city, id: "trending", action: onTrending },
    { icon: Award, label: "Top Restaurants der Woche", id: "top", action: onTopRestaurants },
    { icon: Shuffle, label: "Überrasch mich!", id: "surprise", action: onSurprise },
    { icon: Clock, label: "Limitierte Angebote", id: "limited", action: onLimitedOffers },
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
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
