import foodBurger from "@/assets/food-burger.jpg";
import foodPizza from "@/assets/food-pizza.jpg";
import foodBowl from "@/assets/food-bowl.jpg";
import foodDessert from "@/assets/food-dessert.jpg";
import foodSushi from "@/assets/food-sushi.jpg";
import foodChicken from "@/assets/food-chicken.jpg";
import foodAcai from "@/assets/food-acai.jpg";
import foodRamen from "@/assets/food-ramen.jpg";

export interface FoodPost {
  id: string;
  image: string;
  restaurant: string;
  dish: string;
  description: string;
  price: number;
  rating: number;
  deliveryTime: string;
  isLimited?: boolean;
  limitedCount?: number;
  limitedEndsAt?: number;
  tags: string[];
}

export const foodPosts: FoodPost[] = [
  {
    id: "1",
    image: foodBurger,
    restaurant: "Burger Meister",
    dish: "Smash Burger Deluxe",
    description: "Doppeltes Smash-Patty mit Cheddar, Bacon & Hausspezial-Sauce",
    price: 12.90,
    rating: 4.8,
    deliveryTime: "25-35 Min",
    tags: ["Burger", "Amerikanisch"],
  },
  {
    id: "2",
    image: foodPizza,
    restaurant: "Napoli Express",
    dish: "Pizza Margherita DOP",
    description: "Original neapolitanisch mit San Marzano Tomaten & Büffelmozzarella",
    price: 14.50,
    rating: 4.9,
    deliveryTime: "20-30 Min",
    isLimited: true,
    limitedCount: 12,
    tags: ["Pizza", "Italienisch"],
  },
  {
    id: "3",
    image: foodBowl,
    restaurant: "Green Bowl",
    dish: "Salmon Poké Bowl",
    description: "Frischer Lachs mit Avocado, Edamame & Sushi-Reis",
    price: 15.90,
    rating: 4.7,
    deliveryTime: "15-25 Min",
    tags: ["Bowl", "Gesund"],
  },
  {
    id: "4",
    image: foodDessert,
    restaurant: "Sweet Dreams",
    dish: "Schokoladen Lava Cake",
    description: "Warmer Schokoladenkuchen mit flüssigem Kern & Vanilleeis",
    price: 8.90,
    rating: 4.6,
    deliveryTime: "20-30 Min",
    isLimited: true,
    limitedCount: 5,
    tags: ["Dessert", "Süß"],
  },
  {
    id: "5",
    image: foodSushi,
    restaurant: "Sakura Sushi",
    dish: "Premium Sushi Platte",
    description: "12 Stück handgerolltes Sushi mit Lachs, Thunfisch & Garnelen",
    price: 24.90,
    rating: 4.9,
    deliveryTime: "30-40 Min",
    tags: ["Sushi", "Japanisch"],
  },
  {
    id: "6",
    image: foodChicken,
    restaurant: "Crispy King",
    dish: "Korean Fried Chicken",
    description: "Knusprig paniertes Hähnchen in süß-scharfer Gochujang-Glasur",
    price: 11.50,
    rating: 4.5,
    deliveryTime: "25-35 Min",
    tags: ["Chicken", "Koreanisch"],
  },
  {
    id: "7",
    image: foodAcai,
    restaurant: "Vitality",
    dish: "Açaí Superfood Bowl",
    description: "Açaí-Basis mit frischen Beeren, Granola & Kokosflocken",
    price: 10.90,
    rating: 4.4,
    deliveryTime: "10-20 Min",
    tags: ["Bowl", "Vegan"],
  },
  {
    id: "8",
    image: foodRamen,
    restaurant: "Ramen House",
    dish: "Tonkotsu Ramen",
    description: "Cremige Schweineknochen-Brühe mit Chashu, Ei & Frühlingszwiebeln",
    price: 16.90,
    rating: 4.8,
    deliveryTime: "20-30 Min",
    tags: ["Ramen", "Japanisch"],
  },
];

export const plzCityMap: Record<string, { city: string; restaurants: number }> = {
  "10115": { city: "Berlin", restaurants: 247 },
  "10117": { city: "Berlin", restaurants: 234 },
  "10119": { city: "Berlin", restaurants: 189 },
  "20095": { city: "Hamburg", restaurants: 178 },
  "20097": { city: "Hamburg", restaurants: 165 },
  "80331": { city: "München", restaurants: 312 },
  "80333": { city: "München", restaurants: 298 },
  "50667": { city: "Köln", restaurants: 156 },
  "60311": { city: "Frankfurt am Main", restaurants: 201 },
  "70173": { city: "Stuttgart", restaurants: 143 },
  "40210": { city: "Düsseldorf", restaurants: 134 },
  "44135": { city: "Dortmund", restaurants: 98 },
  "01067": { city: "Dresden", restaurants: 87 },
  "04109": { city: "Leipzig", restaurants: 112 },
};

export function lookupPLZ(plz: string): { city: string; restaurants: number } | null {
  if (plzCityMap[plz]) return plzCityMap[plz];
  // Fallback: generate based on first 2 digits
  const prefix = plz.substring(0, 2);
  const fallbackCities: Record<string, string> = {
    "10": "Berlin", "12": "Berlin", "13": "Berlin", "14": "Berlin",
    "20": "Hamburg", "21": "Hamburg", "22": "Hamburg",
    "80": "München", "81": "München", "85": "München",
    "50": "Köln", "51": "Köln",
    "60": "Frankfurt", "61": "Frankfurt",
    "70": "Stuttgart", "71": "Stuttgart",
    "40": "Düsseldorf", "41": "Düsseldorf",
    "30": "Hannover", "31": "Hannover",
    "90": "Nürnberg", "91": "Nürnberg",
    "28": "Bremen", "27": "Bremen",
    "45": "Essen", "44": "Dortmund",
    "01": "Dresden", "04": "Leipzig",
  };
  const city = fallbackCities[prefix];
  if (city) {
    return { city, restaurants: 50 + Math.floor(Math.random() * 200) };
  }
  if (/^\d{5}$/.test(plz)) {
    return { city: "Ihrer Stadt", restaurants: 30 + Math.floor(Math.random() * 100) };
  }
  return null;
}
