import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";
import { useCart } from "../context/CartContext";

function CheckoutPage() {
  const navigate = useNavigate();
  const { updateCartState } = useCart();

  const [cart, setCart] = useState(null);
  const [shippingAddress, setShippingAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [loading, setLoading] =
    useState(true);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================================
  // FETCH CART
  // =====================================================

  const fetchCheckoutCart = async () => {
    const token =
      localStorage.getItem(
        "access_token"
      );

    if (!token) {
      setError(
        "Please login to continue."
      );
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getCart(token);

      if (!data?.items?.length) {
        setError(
          "Your cart is empty."
        );
        return;
      }

      setCart(data);
    } catch (err) {
      console.error(
        "Checkout cart error:",
        err
      );

      setError(
        err.message ||
          "Unable to load checkout."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckoutCart();
  }, []);

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

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

    if (!shippingAddress.trim()) {
      setError(
        "Please enter your shipping address."
      );
      return;
    }

    try {
      setPlacingOrder(true);
      setError("");

      const order = await placeOrder(
        shippingAddress,
        paymentMethod,
        token
      );

      // Clear frontend cart state
      updateCartState({
        id: cart?.id,
        items: [],
        total: 0,
      });

      navigate(
        "/order-success",
        {
          state: {
            order,
          },
        }
      );
    } catch (err) {
      console.error(
        "Place order error:",
        err
      );

      setError(
        err.message ||
          "Unable to place order."
      );
    } finally {
      setPlacingOrder(false);
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
            Preparing your checkout
          </p>

          <p className="text-sm text-[#756e65] mt-2">
            Please wait...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR WITHOUT CART
  // =====================================================

  if (error && !cart) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-4xl mt-4">
            Checkout Unavailable
          </h1>

          <p className="text-sm text-[#756e65] mt-4 leading-6">
            {error}
          </p>

          <Link
            to="/products"
            className="inline-flex mt-7 bg-[#1b1917] text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
          >
            Continue Shopping
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
            Checkout
          </h1>

          <p className="text-sm text-[#756e65] mt-3 leading-6">
            Complete your details to place your order.
          </p>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-500 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* =================================================
            CHECKOUT LAYOUT
        ================================================= */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* =================================================
              CHECKOUT FORM
          ================================================= */}

          <div className="lg:col-span-2 bg-white border border-[#e8e1d7] rounded-2xl p-6 sm:p-8">

            <form
              onSubmit={handlePlaceOrder}
            >

              {/* SHIPPING */}
              <div>

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                  Delivery
                </p>

                <h2 className="font-serif text-2xl sm:text-3xl mt-2">
                  Shipping Information
                </h2>

                <p className="text-sm text-[#756e65] mt-2">
                  Where should we deliver your pieces?
                </p>

              </div>

              <div className="mt-6">

                <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                  Shipping Address
                </label>

                <textarea
                  value={shippingAddress}
                  onChange={(e) =>
                    setShippingAddress(
                      e.target.value
                    )
                  }
                  rows="5"
                  required
                  placeholder="Enter your complete shipping address"
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-4 text-sm text-[#312d29] placeholder:text-[#aaa197] outline-none focus:border-[#1c1a18] resize-none transition"
                />

              </div>

              {/* PAYMENT */}
              <div className="mt-10">

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                  Payment
                </p>

                <h2 className="font-serif text-2xl sm:text-3xl mt-2">
                  Payment Method
                </h2>

              </div>

              <div className="mt-5 space-y-3">

                {/* COD */}
                <label
                  className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition ${
                    paymentMethod === "COD"
                      ? "border-[#1c1a18] bg-[#f8f5f0]"
                      : "border-[#e2dbd2] hover:border-[#8c8276]"
                  }`}
                >

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={
                      paymentMethod ===
                      "COD"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    className="accent-black"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Cash on Delivery
                    </p>

                    <p className="text-xs text-[#82796f] mt-1">
                      Pay when your order arrives.
                    </p>
                  </div>

                </label>

                {/* ONLINE */}
                <label
                  className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition ${
                    paymentMethod === "ONLINE"
                      ? "border-[#1c1a18] bg-[#f8f5f0]"
                      : "border-[#e2dbd2] hover:border-[#8c8276]"
                  }`}
                >

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE"
                    checked={
                      paymentMethod ===
                      "ONLINE"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                    className="accent-black"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      Online Payment
                    </p>

                    <p className="text-xs text-[#82796f] mt-1">
                      Continue with online payment.
                    </p>
                  </div>

                </label>

              </div>

              {/* PLACE ORDER */}
              <button
                type="submit"
                disabled={
                  placingOrder
                }
                className="mt-10 w-full bg-[#1b1917] text-white py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-black disabled:bg-[#aaa49d] transition"
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

              <Link
                to="/cart"
                className="block text-center mt-4 text-[10px] uppercase tracking-[0.18em] text-[#7d746a] hover:text-black transition"
              >
                ← Return to Cart
              </Link>

            </form>
          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <div className="bg-white border border-[#e8e1d7] rounded-2xl p-6 h-fit lg:sticky lg:top-24">

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
              Your Selection
            </p>

            <h2 className="font-serif text-2xl mt-2">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">

              {cart.items.map(
                (item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4"
                  >

                    <div className="min-w-0">

                      <p className="text-sm font-medium text-[#2a2622]">
                        {item.product_name}
                      </p>

                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#978c81] mt-1">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="text-sm font-medium text-[#2a2622] shrink-0">
                      ₹
                      {Number(
                        item.subtotal
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>
                )
              )}

            </div>

            {/* TOTALS */}
            <div className="border-t border-[#e6dfd6] mt-7 pt-6">

              <div className="flex justify-between text-sm text-[#6f675d]">
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

              <div className="flex justify-between text-sm text-[#6f675d] mt-3">
                <span>
                  Shipping
                </span>

                <span className="text-[#66755f]">
                  Free
                </span>
              </div>

              <div className="border-t border-[#e6dfd6] mt-6 pt-6 flex items-end justify-between">

                <span className="text-[10px] uppercase tracking-[0.2em] text-[#766d63]">
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

            </div>

            {/* TRUST */}
            <div className="mt-7 pt-5 border-t border-[#eee8e0]">

              <p className="text-[8px] uppercase tracking-[0.22em] text-[#9a8666]">
                Shop Haven Promise
              </p>

              <p className="text-xs text-[#82796f] leading-5 mt-2">
                Carefully curated pieces,
                secure checkout and dedicated
                customer support.
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

