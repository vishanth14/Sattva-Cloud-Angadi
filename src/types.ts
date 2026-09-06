export interface Material {
  slug: string;
  name: string;
  number: string;
  description: string;
  shortDesc: string;
  region: string;
  heroImage: string;
  cardImage: string;
  accentColor: string;
  textOnAccent: string;
  essenceTitle: string;
  essenceBody: string;
  craftTitle: string;
  craftSteps: { step: string; desc: string }[];
  culturalRole: string;
  traditionalUse: string;
  modernLife: string;
  usedThen: string;
  usedToday: string;
}

export interface TimelineStage {
  id: string;
  period: string;
  stageNumber: string;
  title: string;
  story: string;
  region: string;
  craftTechnique: string;
  culturalContext: string;
  representativeObject: string;
  image: string;
}

export interface Timeline {
  materialSlug: string;
  stages: TimelineStage[];
}

export interface Product {
  slug: string;
  name: string;
  material: string;
  materialSlug: string;
  region: string;
  price: number;
  rating: number;
  ratingCount: number;
  image: string;
  images: string[];
  description: string;
  story: string;
  traditionalUse: string;
  modernUse: string;
  craftProcess: string;
  artisanCommunity: string;
  category: string;
  inStock: boolean;
  featured: boolean;
  tags: string[];
}

export interface ArtisanCommunity {
  id: string;
  community: string;
  region: string;
  craft: string;
  materials: string[];
  process: string;
  story: string;
  heritage: string;
  image: string;
  craftImage: string;
  productSlugs: string[];
}

export interface RitualStep {
  step: number;
  description: string;
}

export interface Ritual {
  id: string;
  title: string;
  category: "wellness" | "cooking" | "puja" | "dining" | "gifting" | "home";
  description: string;
  traditionalContext: string;
  whatYouNeed: string[];
  materials: string[];
  steps: RitualStep[];
  relatedProductSlugs: string[];
  image: string;
  disclaimer?: string;
}

export interface CareGuide {
  materialSlug: string;
  productSlug?: string;
  howToUse: string[];
  howToClean: string[];
  howToStore: string[];
  whatToAvoid: string[];
  maintenance: string[];
}

export interface RootsEntry {
  keywords: string[];
  question: string;
  response: string;
  tags: ("traditional" | "ayurvedic" | "scientific")[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  address: string;
  city: string;
  status: string;
  date: string;
  deliveryEstimate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  orders: Order[];
  recentlyViewed: string[];
  ritualInterests: string[];
  preferredMaterials: string[];
}
