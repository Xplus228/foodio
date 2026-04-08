import { Menu, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

interface TopBarProps {
  city: string;
  onMenuOpen: () => void;
}

const TopBar = ({ city, onMenuOpen }: TopBarProps) => {
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

        {/* Hamburger */}
        <button
          onClick={onMenuOpen}
          className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:bg-primary-foreground/20 active:scale-90"
        >
          <Menu className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
