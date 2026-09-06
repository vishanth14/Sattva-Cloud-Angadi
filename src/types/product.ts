export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  materialId: string;
  ritualId: string;
  artisanId: string;
  craft: string;
  careGuideId: string;
  description: string;
  culturalContext: string;
  images: string[];
  isFlagship?: boolean;
}
