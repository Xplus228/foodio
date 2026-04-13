import { useState } from "react";
import { ArrowLeft, Grid3X3, Heart, MessageCircle, ShoppingCart, Plus, X, MapPin, Upload, Trash2, Minus, Clock, Flame, Check } from "lucide-react";
import type { FoodPost } from "@/data/mockData";

export interface CartItem {
  post: FoodPost;
  quantity: number;
  addedAt: number;
}

interface ProfilePageProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: FoodPost[];
  likedIds: Set<string>;
  allPosts: FoodPost[];
  comments: Record<string, { text: string; dish: string }[]>;
  cart: CartItem[];
  onUpdateCart: (cart: CartItem[]) => void;
  onOpenPost?: (post: FoodPost) => void;
}

type Tab = "saved" | "liked" | "comments" | "cart";

const ProfilePage = ({ isOpen, onClose, savedItems, likedIds, allPosts, comments, cart, onUpdateCart, onOpenPost }: ProfilePageProps) => {
  const [tab, setTab] = useState<Tab>("cart");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", description: "", price: "", location: "" });
  const [uploadDone, setUploadDone] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "checkout" | "confirmed">("cart");

  if (!isOpen) return null;

  const likedItems = allPosts.filter((p) => likedIds.has(p.id));
  const allComments = Object.entries(comments).flatMap(([postId, cmts]) =>
    cmts.map((c) => ({ ...c, postId }))
  );

  const handleUploadSubmit = () => {
    setUploadDone(true);
    setTimeout(() => {
      setUploadDone(false);
      setShowUpload(false);
      setUploadForm({ title: "", description: "", price: "", location: "" });
    }, 2000);
  };

  const updateQuantity = (index: number, delta: number) => {
    const next = [...cart];
    next[index] = { ...next[index], quantity: Math.max(1, next[index].quantity + delta) };
    onUpdateCart(next);
  };

  const removeItem = (index: number) => {
    onUpdateCart(cart.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.post.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 2.49 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleCheckout = () => {
    setCheckoutStep("confirmed");
    setTimeout(() => {
      onUpdateCart([]);
      setCheckoutStep("cart");
    }, 3000);
  };

  const tabs: { id: Tab; icon: typeof Grid3X3; label: string; count?: number }[] = [
    { id: "cart", icon: ShoppingCart, label: "Warenkorb", count: cart.length },
    { id: "saved", icon: Grid3X3, label: "Gespeichert" },
    { id: "liked", icon: Heart, label: "Likes" },
    { id: "comments", icon: MessageCircle, label: "Kommentare" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:scale-90 transition-all">
          <ArrowLeft className="w-5 h-5 text-secondary-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">Mein Profil</h2>
        <button onClick={() => setShowUpload(true)} className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center active:scale-90 transition-all">
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* User info */}
      <div className="flex flex-col items-center py-5 gap-2">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-foreground">F</span>
        </div>
        <h3 className="text-lg font-bold text-foreground">Foodio Nutzer</h3>
        <p className="text-sm text-muted-foreground">@foodie_user</p>
        <div className="flex gap-6 mt-2">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{savedItems.length}</p>
            <p className="text-xs text-muted-foreground">Gespeichert</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{likedIds.size}</p>
            <p className="text-xs text-muted-foreground">Likes</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{cart.length}</p>
            <p className="text-xs text-muted-foreground">Warenkorb</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setCheckoutStep("cart"); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 transition-all relative ${
              tab === t.id ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
            }`}
          >
            <t.icon className="w-4 h-4" />
            <span className="text-xs font-medium">{t.label}</span>
            {t.count !== undefined && t.count > 0 && (
              <span className="absolute -top-0.5 right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "cart" && checkoutStep === "cart" && (
          <div className="space-y-3">
            {cart.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Dein Warenkorb ist leer</p>
                <p className="text-xs text-muted-foreground mt-1">Entdecke leckere Gerichte im Feed!</p>
              </div>
            )}
            {cart.map((item, i) => (
              <div key={`${item.post.id}-${i}`} className="flex gap-3 p-3 rounded-2xl bg-secondary/40 animate-fade-in">
                <img src={item.post.image} alt={item.post.dish} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{item.post.restaurant}</p>
                      <p className="font-semibold text-foreground text-sm truncate">{item.post.dish}</p>
                    </div>
                    <button onClick={() => removeItem(i)} className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center active:scale-90 transition-all">
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                  {item.post.isLimited && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Flame className="w-3 h-3 text-destructive" />
                      <span className="text-[10px] font-semibold text-destructive">Nur noch {item.post.limitedCount} verfügbar</span>
                      <Clock className="w-3 h-3 text-muted-foreground ml-1" />
                      <span className="text-[10px] text-muted-foreground">Begrenztes Angebot</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-foreground text-sm">{(item.post.price * item.quantity).toFixed(2).replace(".", ",")} €</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(i, -1)} className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center active:scale-90">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(i, 1)} className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center active:scale-90">
                        <Plus className="w-3 h-3 text-primary-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {cart.length > 0 && (
              <div className="mt-4 space-y-2 p-4 rounded-2xl bg-secondary/30">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Zwischensumme</span>
                  <span>{cartTotal.toFixed(2).replace(".", ",")} €</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Liefergebühr</span>
                  <span>{deliveryFee.toFixed(2).replace(".", ",")} €</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                  <span>Gesamt</span>
                  <span>{grandTotal.toFixed(2).replace(".", ",")} €</span>
                </div>
                <button
                  onClick={() => setCheckoutStep("checkout")}
                  className="w-full py-3.5 rounded-2xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 mt-3 active:scale-[0.97] transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Zur Kasse ({grandTotal.toFixed(2).replace(".", ",")} €)
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "cart" && checkoutStep === "checkout" && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Bestellung bestätigen</h3>
            <div className="p-4 rounded-2xl bg-secondary/50 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm">Lieferadresse</p>
                <p className="text-sm text-muted-foreground">Musterstraße 12, 10115 Berlin</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-secondary/50 flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm">Geschätzte Lieferzeit</p>
                <p className="text-sm text-muted-foreground">25-40 Min</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-secondary/30 space-y-2">
              {cart.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={item.post.image} alt={item.post.dish} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.quantity}x {item.post.dish}</p>
                    <p className="text-xs text-muted-foreground">{item.post.restaurant}</p>
                  </div>
                  <span className="text-sm font-bold text-foreground">{(item.post.price * item.quantity).toFixed(2).replace(".", ",")} €</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground mt-2">
                <span>Gesamt</span>
                <span>{grandTotal.toFixed(2).replace(".", ",")} €</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-secondary/50">
              <p className="font-medium text-foreground text-sm mb-2">Zahlungsmethode</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 rounded bg-foreground/10 flex items-center justify-center text-xs font-bold text-foreground">VISA</div>
                <span className="text-sm text-muted-foreground">•••• •••• •••• 4242</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCheckoutStep("cart")} className="flex-1 py-4 rounded-2xl bg-secondary text-secondary-foreground font-semibold active:scale-[0.98] transition-all">
                Zurück
              </button>
              <button onClick={handleCheckout} className="flex-[2] py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                Jetzt bezahlen
              </button>
            </div>
          </div>
        )}

        {tab === "cart" && checkoutStep === "confirmed" && (
          <div className="text-center py-8 animate-scale-in">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5">
              <Check className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Bestellung bestätigt! 🎉</h3>
            <p className="text-muted-foreground">Deine Bestellung ist eingegangen.</p>
            <p className="text-sm text-muted-foreground mt-1">Geschätzte Lieferzeit: 25-40 Min</p>
          </div>
        )}

        {tab === "saved" && (
          <div className="grid grid-cols-3 gap-2">
            {savedItems.length === 0 && (
              <p className="col-span-3 text-center text-muted-foreground py-12 text-sm">Noch keine gespeicherten Gerichte</p>
            )}
            {savedItems.map((item) => (
              <button key={item.id} onClick={() => onOpenPost?.(item)} className="aspect-square rounded-xl overflow-hidden relative animate-scale-in group transition-transform hover:scale-[1.03] active:scale-95">
                <img src={item.image} alt={item.dish} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors flex items-end p-2">
                  <p className="text-xs font-semibold text-primary-foreground line-clamp-2">{item.dish}</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs bg-primary/80 text-primary-foreground px-2 py-0.5 rounded-full">Öffnen</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {tab === "liked" && (
          <div className="grid grid-cols-3 gap-2">
            {likedItems.length === 0 && (
              <p className="col-span-3 text-center text-muted-foreground py-12 text-sm">Noch keine geliketen Gerichte</p>
            )}
            {likedItems.map((item) => (
              <button key={item.id} onClick={() => onOpenPost?.(item)} className="aspect-square rounded-xl overflow-hidden relative animate-scale-in group transition-transform hover:scale-[1.03] active:scale-95">
                <img src={item.image} alt={item.dish} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors flex items-end p-2">
                  <Heart className="w-3 h-3 text-destructive fill-destructive absolute top-2 right-2" />
                  <p className="text-xs font-semibold text-primary-foreground line-clamp-2">{item.dish}</p>
                </div>
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs bg-primary/80 text-primary-foreground px-2 py-0.5 rounded-full">Öffnen</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {tab === "comments" && (
          <div className="flex flex-col gap-3">
            {allComments.length === 0 && (
              <p className="text-center text-muted-foreground py-12 text-sm">Noch keine Kommentare</p>
            )}
            {allComments.map((c, i) => (
              <div key={i} className="p-3 rounded-xl bg-secondary animate-fade-in">
                <p className="text-xs text-muted-foreground mb-1">Zu: {c.dish}</p>
                <p className="text-sm text-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload modal */}
      {showUpload && (
        <div className="fixed inset-0 z-60 flex items-end justify-center">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setShowUpload(false)} />
          <div className="relative w-full max-w-lg bg-background rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Video hochladen</h3>
              <button onClick={() => setShowUpload(false)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <X className="w-4 h-4 text-secondary-foreground" />
              </button>
            </div>
            {uploadDone ? (
              <div className="flex flex-col items-center py-8 animate-scale-in">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-lg font-bold text-foreground">Hochgeladen!</p>
                <p className="text-sm text-muted-foreground">Dein Video wird geprüft</p>
              </div>
            ) : (
              <>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 mb-4 flex flex-col items-center gap-2 bg-secondary/30">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Video auswählen</p>
                  <p className="text-xs text-muted-foreground">MP4, MOV bis 100MB</p>
                </div>
                <div className="flex flex-col gap-3">
                  <input value={uploadForm.title} onChange={(e) => setUploadForm((f) => ({ ...f, title: e.target.value }))} placeholder="Titel des Gerichts" className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary" />
                  <textarea value={uploadForm.description} onChange={(e) => setUploadForm((f) => ({ ...f, description: e.target.value }))} placeholder="Beschreibung" rows={2} className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary resize-none" />
                  <div className="flex gap-3">
                    <input value={uploadForm.price} onChange={(e) => setUploadForm((f) => ({ ...f, price: e.target.value }))} placeholder="Preis (z.B. 12,90)" className="flex-1 px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary" />
                    <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <input value={uploadForm.location} onChange={(e) => setUploadForm((f) => ({ ...f, location: e.target.value }))} placeholder="Standort" className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none" />
                    </div>
                  </div>
                  <button onClick={handleUploadSubmit} className="w-full py-3.5 rounded-2xl gradient-primary text-primary-foreground font-semibold transition-all active:scale-[0.97] mt-2">
                    Hochladen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
