import { Menu, User, ShoppingCart } from "lucide-react";
import { MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

interface TopBarProps {
  city: string;
  onMenuOpen: () => void;
  onProfileOpen: () => void;
  cartCount: number;
}

const TopBar = ({ city, onMenuOpen, onProfileOpen, cartCount }: TopBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 p-4">
      <div className="flex items-center justify-between">
        {/* Logo + location */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Foodio" className="w-9 h-9 rounded-lg" />
          <div>
            <h1 className="text-sm font-bold text-primary-foreground leading-none">Foodio</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-primary" />
              <span className="text-xs text-primary-foreground/70">{city}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Profile */}
          <button
            onClick={onProfileOpen}
            className="relative w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:bg-primary-foreground/20 active:scale-90"
          >
            <User className="w-5 h-5 text-primary-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={onMenuOpen}
            className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:bg-primary-foreground/20 active:scale-90"
          >
            <Menu className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
