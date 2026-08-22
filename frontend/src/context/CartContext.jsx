import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const updateCartState = (data) => {
    setCart(data);

    const count =
      data?.items?.reduce(
        (total, item) => total + item.quantity,
        0
      ) || 0;

    setCartCount(count);
  };

  const fetchCart = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setCart(null);
      setCartCount(0);
      return;
    }

    try {
      const data = await getCart(token);
      updateCartState(data);
    } catch (error) {
      console.error("Cart context error:", error);

      setCart(null);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        fetchCart,
        updateCartState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}