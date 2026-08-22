import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProductById, getProducts } from "../services/productService";

import { addToCart } from "../services/cartService";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import ProductCard from "../Components/ProductCard";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";

function ProductDetailsPage() {
  const { id } = useParams();

  const { updateCartState } = useCart();
  const { updateWishlistState } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [wishlisted, setWishlisted] = useState(false);

  const [wishlistItemId, setWishlistItemId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [addingToCart, setAddingToCart] = useState(false);

  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  // =========================
  // FETCH PRODUCT
  // =========================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setMessage("");
        setQuantity(1);

        const productData = await getProductById(id);

        setProduct(productData);

        // =========================
        // RELATED PRODUCTS
        // =========================
        if (productData.brand?.slug) {
          const relatedData = await getProducts({
            brand: productData.brand.slug,
            pageSize: 8,
          });

          const relatedResults = relatedData.results || [];

          setRelatedProducts(
            relatedResults
              .filter((item) => item.id !== productData.id)
              .slice(0, 4),
          );
        } else {
          setRelatedProducts([]);
        }

        // =========================
        // WISHLIST CHECK
        // =========================
        const token = localStorage.getItem("access_token");

        if (!token) {
          setWishlisted(false);
          setWishlistItemId(null);
          return;
        }

        try {
          const wishlist = await getWishlist();

          const existingItem = wishlist?.items?.find(
            (item) => item.product === productData.id,
          );

          if (existingItem) {
            setWishlisted(true);
            setWishlistItemId(existingItem.id);
          } else {
            setWishlisted(false);
            setWishlistItemId(null);
          }
        } catch (wishlistError) {
          console.error("Wishlist check error:", wishlistError);

          setWishlisted(false);
          setWishlistItemId(null);
        }
      } catch (err) {
        console.error("Product details error:", err);

        setError(err.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // QUANTITY
  // =========================
  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    if (!product || product.stock <= 0) {
      return;
    }

    setQuantity((prev) => Math.min(product.stock, prev + 1));
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async () => {
    if (!product) return;

    if (product.stock <= 0) {
      setError("Product is out of stock.");
      return;
    }

    try {
      setAddingToCart(true);
      setError("");
      setMessage("");

      const updatedCart = await addToCart(product.id, quantity);

      updateCartState(updatedCart);

      setMessage("Product added to cart successfully.");
    } catch (err) {
      console.error("Add to cart error:", err);

      setError(err.message || "Failed to add product to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  // =========================
  // WISHLIST
  // =========================
  const handleWishlist = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login to use wishlist.");
      return;
    }

    if (loadingWishlist) {
      return;
    }

    try {
      setLoadingWishlist(true);
      setError("");
      setMessage("");

      if (!wishlisted) {
        const data = await addToWishlist(product.id);

        const addedItem = data?.items?.find(
          (item) => item.product === product.id,
        );

        setWishlisted(true);

        if (addedItem) {
          setWishlistItemId(addedItem.id);
        }

        updateWishlistState(data);

        setMessage("Added to wishlist.");
      } else {
        if (!wishlistItemId) {
          throw new Error("Wishlist item not found.");
        }

        const data = await removeFromWishlist(wishlistItemId);

        setWishlisted(false);
        setWishlistItemId(null);

        updateWishlistState(data);

        setMessage("Removed from wishlist.");
      }
    } catch (err) {
      console.error("Wishlist error:", err);

      setError(err.message || "Failed to update wishlist.");
    } finally {
      setLoadingWishlist(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  // =========================
  // ERROR
  // =========================
  if (error && !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-500">{error}</p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-full"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const outOfStock = product.stock <= 0;


return (
  <div className="min-h-screen bg-gray-50">

    {/* =========================
        PRODUCT DETAILS
    ========================== */}

    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-start">

        {/* IMAGE */}
        <div className="bg-white rounded-3xl overflow-hidden">
          <div className="aspect-square bg-gray-100">
            {product.image ? (
              <img
                src={`${BASEURL}${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="pt-2">

          {/* Brand */}
          {product.brand?.slug && (
            <Link
              to={`/brands/${product.brand.slug}`}
              className="text-[10px] uppercase tracking-[0.35em] font-medium text-[#9a8666] hover:text-black transition"
            >
              {product.brand.name}
            </Link>
          )}

          {/* Product Name + Wishlist */}
          <div className="flex items-start justify-between gap-5 mt-4">

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.05] tracking-[-0.02em] text-[#1c1a18]">
              {product.name}
            </h1>

            {/* Wishlist */}
            <button
              type="button"
              onClick={handleWishlist}
              disabled={loadingWishlist}
              aria-label={
                wishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              className="shrink-0 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-2xl hover:bg-black hover:text-white disabled:opacity-50 transition"
            >
              {loadingWishlist
                ? "..."
                : wishlisted
                ? "♥"
                : "♡"}
            </button>

          </div>

          {/* Price */}
          <p className="text-2xl font-medium mt-5 tracking-wide text-[#1c1a18]">
            ₹
            {Number(
              product.price
            ).toLocaleString("en-IN")}
          </p>

          {/* Stock */}
          <div className="mt-5">

            {outOfStock ? (
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-red-500">
                Out of Stock
              </span>
            ) : product.stock <= 5 ? (
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#a36d42]">
                Only {product.stock} left
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#66755f]">
                In Stock
              </span>
            )}

          </div>

          {/* Description */}
          <div className="mt-8">

            <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8e8377]">
              Description
            </h2>

            <p className="text-sm leading-7 mt-3 text-[#706960] font-normal">
              {product.description ||
                "No description available."}
            </p>

          </div>

          {/* QUANTITY */}
          {!outOfStock && (
            <div className="mt-8">

              <p className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#8d8275] mb-3">
                Quantity
              </p>

              <div className="inline-flex items-center border border-gray-300 rounded-full overflow-hidden">

                <button
                  type="button"
                  onClick={
                    handleQuantityDecrease
                  }
                  disabled={
                    addingToCart ||
                    quantity <= 1
                  }
                  className="w-12 h-12 hover:bg-gray-100 disabled:opacity-40"
                >
                  −
                </button>

                <span className="w-12 text-center font-medium text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={
                    handleQuantityIncrease
                  }
                  disabled={
                    addingToCart ||
                    quantity >=
                      product.stock
                  }
                  className="w-12 h-12 hover:bg-gray-100 disabled:opacity-40"
                >
                  +
                </button>

              </div>

            </div>
          )}

          {/* MESSAGE */}
          {message && (
            <div className="mt-6 bg-green-50 text-green-600 p-4 rounded-xl text-sm">
              {message}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mt-6 bg-red-50 text-red-500 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* ADD TO CART */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={
              outOfStock ||
              addingToCart
            }
            className="mt-8 w-full bg-black text-white py-4 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-gray-800 disabled:bg-gray-400 transition"
          >
            {outOfStock
              ? "Out of Stock"
              : addingToCart
              ? "Adding..."
              : `Add ${quantity} to Cart`}
          </button>

        </div>
      </div>
    </section>

    {/* =========================
        RELATED PRODUCTS
    ========================== */}

    {relatedProducts.length > 0 && (
      <section className="bg-white border-t border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="flex items-end justify-between gap-5 mb-8">

            <div>

              <p className="text-[9px] uppercase tracking-[0.35em] text-[#9a8666]">
                You May Also Like
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal mt-3 tracking-[-0.01em] text-[#1c1a18]">
                More from{" "}
                {product.brand?.name ||
                  "this brand"}
              </h2>

            </div>

            {product.brand?.slug && (
              <Link
                to={`/brands/${product.brand.slug}`}
                className="text-[10px] uppercase tracking-[0.2em] text-[#6f665b] underline underline-offset-4 hover:text-black transition"
              >
                View Brand
              </Link>
            )}

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {relatedProducts.map(
              (item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              )
            )}

          </div>

        </div>

      </section>
    )}

  </div>
);


}

export default ProductDetailsPage;
