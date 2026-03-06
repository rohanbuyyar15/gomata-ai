import { Type } from "@google/genai";

export interface BreedInfo {
  breed: string;
  milk_yield: string;
  market_value: string;
  daily_income: string;
  maintenance_tips: string;
  market_demand: string;
  description: string;
}

export const CATTLE_BREEDS: Record<string, BreedInfo> = {
  "Gir Cow": {
    breed: "Gir Cow",
    milk_yield: "12-20 Liters/day",
    market_value: "₹60,000 - ₹1,50,000",
    daily_income: "₹500 - ₹900",
    maintenance_tips: "Requires open space, high-protein fodder, and regular grooming.",
    market_demand: "Very High (Known for A2 milk)",
    description: "Originating from Gujarat, known for its distinctive convex forehead and long pendulous ears."
  },
  "Sahiwal Cow": {
    breed: "Sahiwal Cow",
    milk_yield: "10-15 Liters/day",
    market_value: "₹50,000 - ₹1,20,000",
    daily_income: "₹400 - ₹750",
    maintenance_tips: "Resistant to ticks and heat. Needs balanced mineral supplements.",
    market_demand: "High (Best dairy breed in India)",
    description: "Reddish-brown color, heavy build, and high milk fat content."
  },
  "Red Sindhi Cow": {
    breed: "Red Sindhi Cow",
    milk_yield: "8-12 Liters/day",
    market_value: "₹45,000 - ₹90,000",
    daily_income: "₹350 - ₹600",
    maintenance_tips: "Adaptable to various climates. Regular deworming is essential.",
    market_demand: "Moderate to High",
    description: "Deep dark red color, compact body, very hardy and heat tolerant."
  },
  "Tharparkar Cow": {
    breed: "Tharparkar Cow",
    milk_yield: "8-10 Liters/day",
    market_value: "₹40,000 - ₹80,000",
    daily_income: "₹300 - ₹500",
    maintenance_tips: "Excellent for dry regions. Thrives on natural grazing.",
    market_demand: "High in arid regions",
    description: "White or light grey color, dual-purpose breed (milk and draught)."
  },
  "Ongole Cow": {
    breed: "Ongole Cow",
    milk_yield: "4-8 Liters/day",
    market_value: "₹50,000 - ₹2,00,000 (High for bulls)",
    daily_income: "₹200 - ₹400",
    maintenance_tips: "Requires significant exercise. Known for strength.",
    market_demand: "High (Global demand for breeding)",
    description: "Large muscular breed from Andhra Pradesh, famous for the 'Brahman' lineage."
  },
  "Murrah Buffalo": {
    breed: "Murrah Buffalo",
    milk_yield: "15-25 Liters/day",
    market_value: "₹80,000 - ₹2,50,000",
    daily_income: "₹800 - ₹1,500",
    maintenance_tips: "Needs daily bathing/wallowing. High quality concentrate feed required.",
    market_demand: "Extremely High (Gold mine of India)",
    description: "Jet black color with tightly curled horns. The most popular dairy buffalo."
  },
  "Jaffarabadi Buffalo": {
    breed: "Jaffarabadi Buffalo",
    milk_yield: "15-20 Liters/day",
    market_value: "₹70,000 - ₹1,80,000",
    daily_income: "₹700 - ₹1,200",
    maintenance_tips: "Requires large quantities of green fodder. Heavy body needs space.",
    market_demand: "High (High fat content)",
    description: "Massive head and horns, found in the Saurashtra region of Gujarat."
  },
  "Surti Buffalo": {
    breed: "Surti Buffalo",
    milk_yield: "8-12 Liters/day",
    market_value: "₹40,000 - ₹90,000",
    daily_income: "₹400 - ₹650",
    maintenance_tips: "Economical to maintain. Good for small-scale farmers.",
    market_demand: "Moderate",
    description: "Medium-sized, sickle-shaped horns, very efficient milk producer for its size."
  },
  "Mehsana Buffalo": {
    breed: "Mehsana Buffalo",
    milk_yield: "12-18 Liters/day",
    market_value: "₹60,000 - ₹1,30,000",
    daily_income: "₹600 - ₹1,000",
    maintenance_tips: "Regular milking intervals. Balanced diet for consistent yield.",
    market_demand: "High",
    description: "Cross between Murrah and Surti, combines high yield with docility."
  }
};
