import { useCartContext } from '../context/CartContext';

export const useCart = () => {
  return useCartContext();
};
