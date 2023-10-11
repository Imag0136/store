import { createContext } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { Cart } from "../types";

interface CartContextValue {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
}

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext<CartContextValue>({
  cart: [],
  setCart: () => {},
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<Cart>("cart", []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
