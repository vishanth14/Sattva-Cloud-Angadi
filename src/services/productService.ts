import { productsData } from '../data/products';
import { Product } from '../types/product';

export const productService = {
  getAllProducts: (): Product[] => productsData,
  getProductById: (id: string): Product | undefined =>
    productsData.find((p) => p.id === id),
  getProductsByMaterial: (materialId: string): Product[] =>
    productsData.filter((p) => p.materialId === materialId),
  getProductsByRitual: (ritualId: string): Product[] =>
    productsData.filter((p) => p.ritualId === ritualId),
};
