import { productsData } from '../data/products';
import { Product } from '../types/product';

export const recommendationService = {
  getRelatedProducts: (product: Product): Product[] => {
    return productsData
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.materialId === product.materialId || p.ritualId === product.ritualId)
      )
      .slice(0, 3);
  },
};
