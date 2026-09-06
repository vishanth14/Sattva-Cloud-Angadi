export interface Ritual {
  id: string;
  name: string;
  category: 'Morning' | 'Kitchen' | 'Dining' | 'Celebration' | 'Everyday Living';
  description: string;
  culturalContext: string;
  image: string;
}
