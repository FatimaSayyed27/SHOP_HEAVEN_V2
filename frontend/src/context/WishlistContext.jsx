import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getWishlist } from "../services/wishlistService";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateWishlistState = (data) => {
    setWishlist(data);

    const count = data?.items?.length || 0;

    setWishlistCount(count);
  };

  const fetchWishlist = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setWishlist(null);
      setWishlistCount(0);
      return;
    }

    try {
      const data = await getWishlist(token);

      updateWishlistState(data);
    } catch (error) {
      console.error(
        "Wishlist context error:",
        error
      );

      setWishlist(null);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        fetchWishlist,
        updateWishlistState,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}