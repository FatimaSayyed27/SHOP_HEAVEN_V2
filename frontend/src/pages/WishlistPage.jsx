
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import { addToCart } from "../services/cartService";
import { useCart } from "../context/CartContext";

function WishlistPage() {
  const [wishlist, setWishlist] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [removingItem, setRemovingItem] =
    useState(null);

  const [addingItem, setAddingItem] =
    useState(null);

  const [error, setError] =
    useState("");

  const { updateCartState } =
    useCart();

  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL;

  // =====================================================
  // FETCH WISHLIST
  // =====================================================

  useEffect(() => {
    const fetchWishlist = async () => {
      const token =
        localStorage.getItem(
          "access_token"
        );

      if (!token) {
        setError(
          "Please login to view your wishlist."
        );
        setLoading(false);
        return;
      }

      try {
        const data =
          await getWishlist(token);

        setWishlist(data);
      } catch (err) {
        console.error(
          "Wishlist error:",
          err
        );

        setError(
          err.message ||
            "Failed to load wishlist."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // =====================================================
  // REMOVE
  // =====================================================

  const handleRemove = async (
    itemId
  ) => {
    const token =
      localStorage.getItem(
        "access_token"
      );

    if (!token) {
      setError(
        "Please login again."
      );
      return;
    }

    try {
      setRemovingItem(itemId);
      setError("");

      const updatedWishlist =
        await removeFromWishlist(
          itemId,
          token
        );

      setWishlist(
        updatedWishlist
      );
    } catch (err) {
      console.error(
        "Wishlist remove error:",
        err
      );

      setError(
        err.message ||
          "Failed to remove wishlist item."
      );
    } finally {
      setRemovingItem(null);
    }
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart =
    async (productId) => {
      try {
        setAddingItem(productId);
        setError("");

        const updatedCart =
          await addToCart(
            productId,
            1
          );

        updateCartState(
          updatedCart
        );
      } catch (err) {
        console.error(
          "Add to cart error:",
          err
        );

        setError(
          err.message ||
            "Failed to add product to cart."
        );
      } finally {
        setAddingItem(null);
      }
    };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center">

        <div className="text-center">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <p className="font-serif text-2xl mt-3 text-[#1c1a18]">
            Loading your wishlist
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !wishlist) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-3xl mt-4">
            Wishlist Unavailable
          </h1>

          <p className="text-sm text-[#756e65] mt-4 leading-6">
            {error}
          </p>

          <Link
            to="/login"
            className="inline-block mt-7 bg-[#1b1917] text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
          >
            Login
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#1c1a18] px-5 sm:px-8 lg:px-10 py-14 sm:py-16">

      <div className="max-w-6xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl mt-3">
            My Wishlist
          </h1>

          <p className="text-sm text-[#756e65] mt-3 leading-6">
            A collection of pieces you would
            love to keep close.
          </p>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-500 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* =================================================
            EMPTY WISHLIST
        ================================================= */}

        {!wishlist?.items?.length ? (
          <div className="bg-white border border-[#e8e1d7] rounded-2xl p-10 sm:p-14 text-center">

            <div className="text-4xl mb-5 text-[#8f8579]">
              ♡
            </div>

            <p className="text-[9px] uppercase tracking-[0.35em] text-[#9a8666]">
              Your Collection
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl mt-3">
              Your Wishlist is Empty
            </h2>

            <p className="text-sm text-[#756e65] mt-3 leading-6">
              Save your favorite pieces here and
              revisit them whenever inspiration calls.
            </p>

            <Link
              to="/products"
              className="inline-block mt-7 bg-[#1b1917] text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
            >
              Explore Products
            </Link>

          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">

            {wishlist.items.map(
              (item) => (
                <div
                  key={item.id}
                  className="group"
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <Link
                    to={`/products/${item.product}`}
                    className="block"
                  >

                    <div className="relative aspect-[0.82] bg-[#efebe5] overflow-hidden rounded-[2px]">

                      {item.product_image ? (
                        <img
                          src={`${BASEURL}${item.product_image}`}
                          alt={item.product_name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-[#9a9288]">
                          No image
                        </div>
                      )}

                    </div>

                  </Link>

                  {/* =================================================
                      PRODUCT TEXT
                  ================================================= */}

                  <div className="pt-4">

                    <p className="text-[9px] uppercase tracking-[0.28em] text-[#9a8666]">
                      Saved Piece
                    </p>

                    <Link
                      to={`/products/${item.product}`}
                    >
                      <h2 className="font-serif text-base sm:text-lg mt-2 text-[#1c1a18] hover:text-[#746a5f] transition">
                        {item.product_name}
                      </h2>
                    </Link>

                    <p className="text-sm mt-2 text-[#756e65]">
                      ₹
                      {Number(
                        item.product_price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(
                          item.product
                        )
                      }
                      disabled={
                        addingItem ===
                        item.product
                      }
                      className="w-full mt-4 bg-[#1b1917] text-white py-3 rounded-full text-[10px] uppercase tracking-[0.16em] hover:bg-black disabled:bg-[#aaa49d] transition"
                    >
                      {addingItem ===
                      item.product
                        ? "Adding..."
                        : "Add to Cart"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(
                          item.id
                        )
                      }
                      disabled={
                        removingItem ===
                        item.id
                      }
                      className="w-full mt-3 text-[9px] uppercase tracking-[0.16em] text-[#9b665e] hover:text-red-600 disabled:opacity-50 transition"
                    >
                      {removingItem ===
                      item.id
                        ? "Removing..."
                        : "Remove from Wishlist"}
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default WishlistPage;

