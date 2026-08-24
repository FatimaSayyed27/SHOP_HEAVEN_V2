import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getFeaturedProducts } from "../services/productService";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import { useWishlist } from "../context/WishlistContext";
import ProductGridSkeleton from "./ProductGridSkeleton";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [wishlistedItems, setWishlistedItems] = useState({});

  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(null);

  const [error, setError] = useState("");

  const { updateWishlistState } = useWishlist();

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getFeaturedProducts();

        setProducts(data);

        const token = localStorage.getItem("access_token");

        if (!token) {
          return;
        }

        try {
          const wishlist = await getWishlist();

          const map = {};

          wishlist?.items?.forEach((item) => {
            map[item.product] = item.id;
          });

          setWishlistedItems(map);
        } catch (wishlistError) {
          console.error("Wishlist fetch error:", wishlistError);
        }
      } catch (err) {
        console.error("Featured products error:", err);

        setError(err.message || "Failed to load featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleWishlist = async (productId) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (wishlistLoading === productId) {
      return;
    }

    try {
      setWishlistLoading(productId);

      if (wishlistedItems[productId]) {
        const wishlistItemId = wishlistedItems[productId];

        const updatedWishlist = await removeFromWishlist(wishlistItemId);

        setWishlistedItems((prev) => {
          const next = { ...prev };
          delete next[productId];
          return next;
        });

        updateWishlistState(updatedWishlist);
      } else {
        const updatedWishlist = await addToWishlist(productId);

        const addedItem = updatedWishlist?.items?.find(
          (item) => item.product === productId,
        );

        if (addedItem) {
          setWishlistedItems((prev) => ({
            ...prev,
            [productId]: addedItem.id,
          }));
        }

        updateWishlistState(updatedWishlist);
      }
    } catch (err) {
      console.error("Wishlist error:", err);

      setError(err.message || "Failed to update wishlist.");
    } finally {
      setWishlistLoading(null);
    }
  };

  return (
    <section className="bg-[#fbfaf7]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-24">
        {/* Heading */}
        <div className="flex items-end justify-between gap-5 mb-10 sm:mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#9c8d76]">
              Curated for you
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c1a18] mt-3">
              Featured New Arrivals
            </h2>

            <p className="text-sm text-[#7d766d] mt-3">
              Discover the pieces defining the season.
            </p>
          </div>

          <Link
            to="/products"
            className="hidden sm:inline-flex text-[11px] uppercase tracking-[0.2em] text-[#615a50] border-b border-[#a79b8b] pb-1 hover:text-black transition"
          >
            View All
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 text-red-500 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && <ProductGridSkeleton count={8} />}

        {/* Products */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-7 gap-y-12">
              {products.slice(0, 8).map((product) => {
                const isWishlisted = Boolean(wishlistedItems[product.id]);

                const isLoading = wishlistLoading === product.id;

                return (
                  <article key={product.id} className="group">
                    {/* Image */}
                    <div className="relative aspect-[0.88] sm:aspect-[0.9] bg-[#efede8] overflow-hidden rounded-[2px]">
                      <Link
                        to={`/products/${product.id}`}
                        className="block w-full h-full"
                      >
                     {product.image ? (
  <img
    src={getImageUrl(product.image)}
    alt={product.name}
    className="w-full h-full object-cover group-hover:scale-[1.035] transition duration-700 ease-out"
  />
) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </Link>

                      {/* Wishlist */}
                      <button
                        type="button"
                        onClick={() => handleWishlist(product.id)}
                        disabled={isLoading}
                        aria-label={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-sm hover:scale-110 transition disabled:opacity-50"
                      >
                        {isLoading ? (
                          <span className="text-xs">...</span>
                        ) : (
                          <span
                            className={
                              isWishlisted
                                ? "text-black text-lg"
                                : "text-gray-600 text-lg"
                            }
                          >
                            {isWishlisted ? "♥" : "♡"}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Info */}
                    <div className="pt-4">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-[#a09380]">
                        {product.brand?.name || product.brand_name || "Brand"}
                      </p>

                      <Link
                        to={`/products/${product.id}`}
                        className="block mt-2 text-sm sm:text-[15px] font-medium text-[#1c1a18] leading-5 hover:text-[#776e62] transition"
                      >
                        {product.name}
                      </Link>

                      <p className="mt-2 text-sm font-medium text-[#1c1a18]">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="flex justify-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center px-7 py-3 rounded-full border border-[#b8afa2] text-[11px] uppercase tracking-[0.2em] text-[#4d4842] hover:bg-[#1c1a18] hover:text-white hover:border-[#1c1a18] transition"
              >
                Explore Collection
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
