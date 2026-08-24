import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../services/cartService";

import getImageUrl from "../utils/imageUrl";

import { useCart } from "../context/CartContext";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  const [error, setError] = useState("");

  const { updateCartState } = useCart();

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const fetchCartData = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login to view your cart.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getCart(token);

      setCart(data);
      updateCartState(data);
    } catch (err) {
      console.error("Cart fetch error:", err);
      setError(err.message || "Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login again.");
      return;
    }

    try {
      setUpdatingItem(itemId);
      setError("");

      const updatedCart = await updateCartItem(
        itemId,
        quantity,
        token
      );

      setCart(updatedCart);
      updateCartState(updatedCart);
    } catch (err) {
      console.error("Quantity update error:", err);
      setError(
        err.message || "Failed to update quantity."
      );
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRemove = async (itemId) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login again.");
      return;
    }

    try {
      setRemovingItem(itemId);
      setError("");

      const updatedCart = await removeCartItem(
        itemId,
        token
      );

      setCart(updatedCart);
      updateCartState(updatedCart);
    } catch (err) {
      console.error("Remove item error:", err);
      setError(
        err.message || "Failed to remove item."
      );
    } finally {
      setRemovingItem(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  if (error && !cart) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-500 mb-5">{error}</p>

          <Link
            to="/login"
            className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
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

      {/* =========================================
          HEADER
      ========================================== */}

      <div className="mb-10">

        <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
          Shop Haven
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl mt-3 tracking-[-0.02em]">
          Your Cart
        </h1>

        <p className="text-sm text-[#756e65] mt-3 leading-6">
          Review your selected pieces before
          continuing to checkout.
        </p>

      </div>

      {/* =========================================
          ERROR
      ========================================== */}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-100 text-red-500 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* =========================================
          EMPTY CART
      ========================================== */}

      {!cart?.items?.length ? (
        <div className="bg-white border border-[#e8e1d7] rounded-2xl p-10 sm:p-14 text-center">

          <div className="text-4xl mb-5">
            🛒
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl">
            Your Cart is Empty
          </h2>

          <p className="text-sm text-[#756e65] mt-3 leading-6">
            Your collection is waiting for something
            exceptional.
          </p>

          <Link
            to="/products"
            className="inline-block mt-7 bg-[#1b1917] text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">

          {/* =====================================
              CART ITEMS
          ====================================== */}

          <div className="lg:col-span-2 space-y-4">

            {cart.items.map((item) => {

              const isUpdating =
                updatingItem === item.id;

              const isRemoving =
                removingItem === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#e8e1d7] rounded-2xl p-4 sm:p-5"
                >

                  <div className="flex gap-4 sm:gap-5">

                    {/* IMAGE */}
                    <div className="shrink-0">

                     {item.product_image ? (
  <img
    src={getImageUrl(item.product_image)}
    alt={item.product_name}
    className="w-24 h-28 sm:w-28 sm:h-32 object-cover rounded-xl bg-[#efebe5]"
  />
) : (
                        <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl bg-[#efebe5] flex items-center justify-center text-xs text-[#9a9288]">
                          No image
                        </div>
                      )}

                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="flex-1 min-w-0">

                      <p className="text-[8px] uppercase tracking-[0.3em] text-[#9a8666]">
                        Selected Piece
                      </p>

                      <h2 className="font-serif text-lg sm:text-xl mt-1 text-[#1c1a18]">
                        {item.product_name}
                      </h2>

                      <p className="text-sm text-[#756e65] mt-2">
                        ₹
                        {Number(
                          item.product_price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      {/* QUANTITY */}
                      <div className="mt-5 flex flex-wrap items-center gap-3">

                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#8c8277]">
                          Quantity
                        </span>

                        <div className="flex items-center border border-[#d8d0c5] rounded-full overflow-hidden">

                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            disabled={
                              item.quantity === 1 ||
                              isUpdating ||
                              isRemoving
                            }
                            className="w-9 h-9 hover:bg-[#f4f0ea] disabled:opacity-40 transition"
                          >
                            −
                          </button>

                          <span className="w-9 text-center text-sm font-medium">
                            {isUpdating
                              ? "..."
                              : item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            disabled={
                              isUpdating ||
                              isRemoving
                            }
                            className="w-9 h-9 hover:bg-[#f4f0ea] disabled:opacity-40 transition"
                          >
                            +
                          </button>

                        </div>

                      </div>

                      {/* REMOVE */}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(item.id)
                        }
                        disabled={
                          isRemoving ||
                          isUpdating
                        }
                        className="mt-4 text-[9px] uppercase tracking-[0.18em] text-[#9b665e] hover:text-red-600 disabled:opacity-50 transition"
                      >
                        {isRemoving
                          ? "Removing..."
                          : "Remove"}
                      </button>

                    </div>

                    {/* SUBTOTAL */}
                    <div className="shrink-0 text-right">

                      <p className="text-[8px] uppercase tracking-[0.18em] text-[#9a8666]">
                        Subtotal
                      </p>

                      <p className="font-medium mt-2 text-[#1c1a18]">
                        ₹
                        {Number(
                          item.subtotal
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* =====================================
              ORDER SUMMARY
          ====================================== */}

          <div className="bg-white border border-[#e8e1d7] rounded-2xl p-6 h-fit lg:sticky lg:top-24">

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
              Summary
            </p>

            <h2 className="font-serif text-2xl mt-2">
              Order Summary
            </h2>

            {/* SUBTOTAL */}
            <div className="flex justify-between mt-7 text-sm text-[#6f675d]">

              <span>
                Subtotal
              </span>

              <span>
                ₹
                {Number(
                  cart.total
                ).toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            {/* SHIPPING */}
            <div className="flex justify-between mt-3 text-sm text-[#6f675d]">

              <span>
                Shipping
              </span>

              <span className="text-[#65745d]">
                Free
              </span>

            </div>

            {/* TOTAL */}
            <div className="border-t border-[#e6dfd6] mt-6 pt-6 flex justify-between items-end">

              <span className="text-[10px] uppercase tracking-[0.22em] text-[#766d63]">
                Total
              </span>

              <span className="font-serif text-2xl">
                ₹
                {Number(
                  cart.total
                ).toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            {/* CHECKOUT */}
            <Link
              to="/checkout"
              className="block text-center mt-7 bg-[#1b1917] text-white py-4 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
            >
              Proceed to Checkout
            </Link>

            {/* CONTINUE */}
            <Link
              to="/products"
              className="block text-center mt-4 text-[10px] uppercase tracking-[0.18em] text-[#7c7268] hover:text-black transition"
            >
              Continue Shopping
            </Link>

          </div>

        </div>
      )}

    </div>
  </div>
);


}

export default CartPage;