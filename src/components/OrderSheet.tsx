import { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingBag, Check, MapPin, Clock } from "lucide-react";
import type { FoodPost } from "@/data/mockData";

interface OrderSheetProps {
  post: FoodPost;
  onClose: () => void;
}

type OrderStep = "details" | "checkout" | "confirmed";

const OrderSheet = ({ post, onClose }: OrderSheetProps) => {
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<OrderStep>("details");
  const [note, setNote] = useState("");

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const total = post.price * quantity;
  const deliveryFee = 2.49;
  const grandTotal = total + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-foreground/50 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className={`relative w-full max-w-lg bg-background rounded-t-3xl transition-transform duration-300 ease-out ${visible ? "translate-y-0" : "translate-y-full"}`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center transition-all active:scale-90"
        >
          <X className="w-4 h-4 text-secondary-foreground" />
        </button>

        {step === "details" && (
          <div className="p-5 pt-2 overflow-y-auto" style={{ maxHeight: "80vh" }}>
            {/* Header with image */}
            <div className="flex gap-4 mb-5">
              <img src={post.image} alt={post.dish} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">{post.restaurant}</p>
                <h3 className="text-lg font-bold text-foreground mt-0.5">{post.dish}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.description}</p>
              </div>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50 mb-4">
              <span className="font-medium text-foreground">Anzahl</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center transition-all active:scale-90"
                >
                  <Minus className="w-4 h-4 text-foreground" />
                </button>
                <span className="text-lg font-bold text-foreground w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center transition-all active:scale-90"
                >
                  <Plus className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>

            {/* Note */}
            <div className="mb-5">
              <label className="text-sm font-medium text-foreground mb-2 block">Anmerkungen (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="z.B. ohne Zwiebeln, extra scharf..."
                className="w-full p-3 rounded-xl bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                rows={2}
              />
            </div>

            {/* Price summary */}
            <div className="space-y-2 mb-5 p-4 rounded-2xl bg-secondary/30">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{quantity}x {post.dish}</span>
                <span>{total.toFixed(2).replace(".", ",")} €</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Liefergebühr</span>
                <span>{deliveryFee.toFixed(2).replace(".", ",")} €</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                <span>Gesamt</span>
                <span>{grandTotal.toFixed(2).replace(".", ",")} €</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setStep("checkout")}
              className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:shadow-elevated active:scale-[0.98]"
            >
              <ShoppingBag className="w-5 h-5" />
              Zur Kasse ({grandTotal.toFixed(2).replace(".", ",")} €)
            </button>
          </div>
        )}

        {step === "checkout" && (
          <div className="p-5 pt-2 overflow-y-auto" style={{ maxHeight: "80vh" }}>
            <h3 className="text-xl font-bold text-foreground mb-5">Bestellung bestätigen</h3>

            {/* Delivery info */}
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/50">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm">Lieferadresse</p>
                  <p className="text-sm text-muted-foreground">Musterstraße 12, 10115 Berlin</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/50">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm">Geschätzte Lieferzeit</p>
                  <p className="text-sm text-muted-foreground">{post.deliveryTime}</p>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="p-4 rounded-2xl bg-secondary/30 mb-5">
              <div className="flex gap-3 mb-3">
                <img src={post.image} alt={post.dish} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <p className="font-medium text-foreground text-sm">{quantity}x {post.dish}</p>
                  <p className="text-xs text-muted-foreground">{post.restaurant}</p>
                  {note && <p className="text-xs text-muted-foreground mt-1">📝 {note}</p>}
                </div>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                <span>Gesamt</span>
                <span>{grandTotal.toFixed(2).replace(".", ",")} €</span>
              </div>
            </div>

            {/* Payment method (visual only) */}
            <div className="p-4 rounded-2xl bg-secondary/50 mb-5">
              <p className="font-medium text-foreground text-sm mb-2">Zahlungsmethode</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 rounded bg-foreground/10 flex items-center justify-center text-xs font-bold text-foreground">VISA</div>
                <span className="text-sm text-muted-foreground">•••• •••• •••• 4242</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="flex-1 py-4 rounded-2xl bg-secondary text-secondary-foreground font-semibold transition-all active:scale-[0.98]"
              >
                Zurück
              </button>
              <button
                onClick={() => setStep("confirmed")}
                className="flex-[2] py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-elevated active:scale-[0.98]"
              >
                Jetzt bezahlen
              </button>
            </div>
          </div>
        )}

        {step === "confirmed" && (
          <div className="p-5 pt-2 text-center" style={{ maxHeight: "80vh" }}>
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5 animate-scale-in">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Bestellung bestätigt! 🎉</h3>
            <p className="text-muted-foreground mb-1">
              Deine Bestellung bei <span className="font-semibold text-foreground">{post.restaurant}</span> ist eingegangen.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Geschätzte Lieferzeit: <span className="font-medium text-foreground">{post.deliveryTime}</span>
            </p>

            <div className="p-4 rounded-2xl bg-secondary/30 mb-6 inline-flex items-center gap-3">
              <img src={post.image} alt={post.dish} className="w-12 h-12 rounded-xl object-cover" />
              <div className="text-left">
                <p className="font-medium text-foreground text-sm">{quantity}x {post.dish}</p>
                <p className="text-xs text-muted-foreground">{grandTotal.toFixed(2).replace(".", ",")} €</p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-lg transition-all hover:shadow-elevated active:scale-[0.98]"
            >
              Weiter entdecken
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSheet;
