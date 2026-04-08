import { useState } from "react";
import { MapPin, ArrowRight, Check } from "lucide-react";
import { lookupPLZ } from "@/data/mockData";
import logo from "@/assets/logo.png";

interface PLZScreenProps {
  onComplete: (city: string, restaurants: number) => void;
}

type Step = "input" | "confirm" | "count";

const PLZScreen = ({ onComplete }: PLZScreenProps) => {
  const [plz, setPlz] = useState("");
  const [step, setStep] = useState<Step>("input");
  const [cityData, setCityData] = useState<{ city: string; restaurants: number } | null>(null);

  const handleSubmit = () => {
    const result = lookupPLZ(plz);
    if (result) {
      setCityData(result);
      setStep("confirm");
    }
  };

  const handleConfirm = () => {
    setStep("count");
    setTimeout(() => {
      if (cityData) onComplete(cityData.city, cityData.restaurants);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <img
          src={logo}
          alt="Foodio Logo"
          className="w-24 h-24 mb-4 animate-scale-in rounded-2xl"
        />
        <h1 className="text-3xl font-bold text-gradient mb-1 animate-fade-in">Foodio</h1>
        <p className="text-muted-foreground text-sm mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Entdecke Essen, das dich begeistert
        </p>

        {step === "input" && (
          <div className="w-full space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="Postleitzahl eingeben"
                value={plz}
                onChange={(e) => setPlz(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && plz.length === 5 && handleSubmit()}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border text-foreground text-lg font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={plz.length !== 5}
              className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-elevated active:scale-[0.98]"
            >
              Weiter
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === "confirm" && cityData && (
          <div className="w-full space-y-4 animate-fade-in-up">
            <div className="p-6 rounded-2xl gradient-card border border-border text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-muted-foreground text-sm mb-1">Ist dies Ihr aktueller Standort?</p>
              <p className="text-2xl font-bold text-foreground">{cityData.city}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setStep("input"); setPlz(""); }}
                className="flex-1 py-4 rounded-2xl bg-secondary text-secondary-foreground font-semibold transition-all hover:bg-secondary/80 active:scale-[0.98]"
              >
                Nein
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-elevated active:scale-[0.98]"
              >
                <Check className="w-5 h-5" />
                Ja
              </button>
            </div>
          </div>
        )}

        {step === "count" && cityData && (
          <div className="w-full text-center animate-scale-in">
            <div className="p-8 rounded-3xl gradient-card border border-border">
              <div className="text-5xl font-black text-gradient mb-2 animate-bounce-subtle">
                ~{cityData.restaurants}
              </div>
              <p className="text-muted-foreground text-lg">
                Restaurants in Ihrem Umkreis
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
                <span className="text-sm font-medium">Wird geladen...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PLZScreen;
