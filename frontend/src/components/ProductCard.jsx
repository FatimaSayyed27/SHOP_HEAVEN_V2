import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL;

  const [wishlisted, setWishlisted] =
    useState(false);

  const [wishlistItemId, setWishlistItemId] =
    useState(null);

  const [loadingWishlist, setLoadingWishlist] =
    useState(false);

  const [wishlistError, setWishlistError] =
    useState("");

  const { updateWishlistState } =
    useWishlist();

  // =====================================================
  // CHECK WISHLIST
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const checkWishlist = async () => {
      const token =
        localStorage.getItem(
          "access_token"
        );

      if (!token) {
        setWishlisted(false);
        setWishlistItemId(null);
        return;
      }

      try {
        const data =
          await getWishlist(token);

        if (cancelled) {
          return;
        }

        const existingItem =
          data?.items?.find(
            (item) =>
              item.product ===
              product.id
          );

        if (existingItem) {
          setWishlisted(true);
          setWishlistItemId(
            existingItem.id
          );
        } else {
          setWishlisted(false);
          setWishlistItemId(null);
        }
      } catch (error) {
        console.error(
          "Wishlist check error:",
          error
        );
      }
    };

    checkWishlist();

    return () => {
      cancelled = true;
    };
  }, [product.id]);

  // =====================================================
  // WISHLIST TOGGLE
  // =====================================================

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token =
      localStorage.getItem(
        "access_token"
      );

    if (!token) {
      setWishlistError(
        "Please login to use wishlist."
      );

      return;
    }

    if (loadingWishlist) {
      return;
    }

    try {
      setLoadingWishlist(true);
      setWishlistError("");

      if (!wishlisted) {
        const data =
          await addToWishlist(
            product.id,
            token
          );

        const addedItem =
          data?.items?.find(
            (item) =>
              item.product ===
              product.id
          );

        setWishlisted(true);

        if (addedItem) {
          setWishlistItemId(
            addedItem.id
          );
        }

        updateWishlistState(data);
      } else {
        if (!wishlistItemId) {
          throw new Error(
            "Wishlist item not found."
          );
        }

        const data =
          await removeFromWishlist(
            wishlistItemId,
            token
          );

        setWishlisted(false);
        setWishlistItemId(null);

        updateWishlistState(data);
      }
    } catch (error) {
      console.error(
        "Wishlist toggle error:",
        error
      );

      setWishlistError(
        error.message ||
          "Wishlist update failed."
      );
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <article className="group">

      {/* =================================================
          IMAGE
      ================================================= */}

    <div className="relative aspect-[0.78] sm:aspect-[0.82] bg-[#efede8] overflow-hidden rounded-[2px]">

        <Link
          to={`/products/${product.id}`}
          className="block w-full h-full"
        >
{product.image ? (
  <img
    src={
      product.image.startsWith("http")
        ? product.image
        : `${BASEURL}${product.image}`
    }
    alt={product.name}
    loading="lazy"
    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
  />
) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-[#999188]">
              No image
            </div>
          )}
        </Link>

        {/* ===============================================
            WISHLIST
        ================================================ */}

        <button
          type="button"
          onClick={handleWishlist}
          disabled={loadingWishlist}
          aria-label={
            wishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 hover:bg-white transition disabled:opacity-50"
        >
          {loadingWishlist ? (
            <span className="text-[10px] text-[#777067]">
              ...
            </span>
          ) : (
            <span
              className={
                wishlisted
                  ? "text-[#1b1917] text-lg leading-none"
                  : "text-[#655e56] text-lg leading-none"
              }
            >
              {wishlisted
                ? "♥"
                : "♡"}
            </span>
          )}
        </button>

      </div>

      {/* =================================================
          PRODUCT INFO
      ================================================= */}

      <div className="pt-4">

        {/* Brand */}
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#a09380]">
          {product.brand?.name ||
            product.brand_name ||
            "Shop Haven"}
        </p>

        {/* Product Name */}
        <Link
          to={`/products/${product.id}`}
          className="block mt-2"
        >
          <h3 className="text-sm sm:text-[15px] leading-5 font-medium text-[#1c1a18] hover:text-[#776e62] transition">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p className="mt-2 text-sm font-semibold text-[#1c1a18]">
          ₹
          {Number(
            product.price
          ).toLocaleString(
            "en-IN"
          )}
        </p>

        {/* Wishlist Error */}
        {wishlistError && (
          <p className="mt-2 text-[11px] leading-4 text-red-500">
            {wishlistError}
          </p>
        )}

      </div>
    </article>
  );
}

export default ProductCard;

