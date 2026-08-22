import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getOrderById,
  cancelOrder,
} from "../services/orderService";

function OrderDetailsPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] =
    useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // =====================================================
  // FETCH ORDER
  // =====================================================

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getOrderById(orderId);

        setOrder(data);
      } catch (err) {
        console.error(
          "Order fetch error:",
          err
        );

        setError(
          err.message ||
            "Failed to load order."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // =====================================================
  // CANCEL ORDER
  // =====================================================

  const handleCancelOrder = async () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to cancel this order?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(true);
      setError("");
      setMessage("");

      const updatedOrder =
        await cancelOrder(orderId);

      setOrder(updatedOrder);

      setMessage(
        "Order cancelled successfully."
      );
    } catch (err) {
      console.error(
        "Cancel order error:",
        err
      );

      setError(
        err.message ||
          "Failed to cancel order."
      );
    } finally {
      setCancelling(false);
    }
  };

  // =====================================================
  // STATUS COLORS
  // =====================================================

  const getStatusClasses = (
    status
  ) => {
    switch (status) {
      case "PENDING":
        return "bg-[#f5efe0] text-[#8c7445]";

      case "CONFIRMED":
        return "bg-[#e9eef4] text-[#596f89]";

      case "SHIPPED":
        return "bg-[#eee9f4] text-[#75618d]";

      case "DELIVERED":
        return "bg-[#e8f0e5] text-[#687b60]";

      case "CANCELLED":
        return "bg-[#f8eaea] text-[#a15e58]";

      default:
        return "bg-[#efede8] text-[#6f675d]";
    }
  };

  // =====================================================
  // TRACKING
  // =====================================================

  const statusSteps = [
    {
      key: "PENDING",
      label: "Order Placed",
    },
    {
      key: "CONFIRMED",
      label: "Confirmed",
    },
    {
      key: "SHIPPED",
      label: "Shipped",
    },
    {
      key: "DELIVERED",
      label: "Delivered",
    },
  ];

  const statusOrder = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
  ];

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
            Loading order details
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !order) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-3xl mt-4">
            Order Not Found
          </h1>

          <p className="text-sm text-[#756e65] mt-4 leading-6">
            {error}
          </p>

          <Link
            to="/orders"
            className="inline-block mt-7 bg-[#1b1917] text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
          >
            Back to Orders
          </Link>

        </div>

      </div>
    );
  }

  const currentStatusIndex =
    statusOrder.indexOf(
      order.status
    );

  const canCancel =
    order.status === "PENDING" ||
    order.status === "CONFIRMED";

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#1c1a18] px-5 sm:px-8 lg:px-10 py-14 sm:py-16">

      <div className="max-w-4xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div>

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] text-[#968b80] mt-5">
            Order #{order.id}
          </p>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">

            <h1 className="font-serif text-4xl sm:text-5xl">
              Order Details
            </h1>

            <span
              className={`inline-flex w-fit px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium ${getStatusClasses(
                order.status
              )}`}
            >
              {order.status}
            </span>

          </div>
        </div>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {message && (
          <div className="mt-6 bg-[#edf3ea] border border-[#dce7d7] text-[#66755f] p-4 rounded-xl text-sm">
            {message}
          </div>
        )}

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div className="mt-6 bg-[#fdf0ef] border border-[#efd9d5] text-[#a45d55] p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* =================================================
            ORDER INFORMATION
        ================================================= */}

        <div className="bg-white border border-[#e8e1d7] rounded-2xl p-6 sm:p-7 mt-8">

          <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
            Order Information
          </p>

          <div className="mt-6">

            <div className="flex justify-between gap-5">

              <span className="text-sm text-[#8a8177]">
                Status
              </span>

              <span className="text-sm font-medium text-[#2a2723]">
                {order.status}
              </span>

            </div>

            <div className="flex justify-between gap-5 mt-5">

              <span className="text-sm text-[#8a8177]">
                Payment
              </span>

              <span className="text-sm text-[#2a2723]">
                {order.payment_method}
              </span>

            </div>

            <div className="flex justify-between gap-5 mt-5">

              <span className="text-sm text-[#8a8177]">
                Order Date
              </span>

              <span className="text-sm text-[#2a2723]">
                {new Date(
                  order.created_at
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </span>

            </div>

            <div className="mt-7 border-t border-[#e6dfd7] pt-7">

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a8d81]">
                Shipping Address
              </p>

              <p className="text-sm leading-6 text-[#6f675d] mt-3">
                {order.shipping_address}
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            ORDER TRACKING
        ================================================= */}

        {order.status === "CANCELLED" ? (

          <div className="bg-[#fdf0ef] border border-[#efd9d5] rounded-2xl p-6 sm:p-7 mt-5">

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#a15e58]">
              Order Status
            </p>

            <h2 className="font-serif text-2xl mt-2 text-[#a15e58]">
              Order Cancelled
            </h2>

            <p className="text-sm text-[#a86660] mt-2">
              This order has been cancelled successfully.
            </p>

          </div>

        ) : (

          <div className="bg-white border border-[#e8e1d7] rounded-2xl p-6 sm:p-7 mt-5">

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
              Journey
            </p>

            <h2 className="font-serif text-2xl mt-2">
              Order Tracking
            </h2>

            <div className="mt-8">

              {statusSteps.map(
                (step, index) => {

                  const completed =
                    currentStatusIndex >=
                    index;

                  const current =
                    order.status ===
                    step.key;

                  return (
                    <div
                      key={step.key}
                      className="flex items-start gap-4"
                    >

                      {/* Timeline */}
                      <div className="flex flex-col items-center">

                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-medium ${
                            completed
                              ? "bg-[#1b1917] text-white"
                              : "bg-[#ece8e2] text-[#8d857c]"
                          }`}
                        >
                          {completed
                            ? "✓"
                            : index + 1}
                        </div>

                        {index <
                          statusSteps.length -
                            1 && (
                          <div
                            className={`w-px h-12 ${
                              currentStatusIndex >
                              index
                                ? "bg-[#1b1917]"
                                : "bg-[#ddd7cf]"
                            }`}
                          />
                        )}

                      </div>

                      {/* Text */}
                      <div className="pt-1 pb-5">

                        <p
                          className={`text-sm font-medium ${
                            current
                              ? "text-[#1c1a18]"
                              : completed
                              ? "text-[#615a52]"
                              : "text-[#aaa199]"
                          }`}
                        >
                          {step.label}
                        </p>

                        {current && (
                          <p className="text-[10px] uppercase tracking-[0.15em] text-[#9a8666] mt-1">
                            Current status
                          </p>
                        )}

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>
        )}

        {/* =================================================
            ORDER ITEMS
        ================================================= */}

        <div className="bg-white border border-[#e8e1d7] rounded-2xl p-6 sm:p-7 mt-5">

          <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
            Your Selection
          </p>

          <h2 className="font-serif text-2xl mt-2">
            Items
          </h2>

          <div className="mt-6 space-y-4">

            {order.items.map(
              (item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-5 border-b border-[#e6dfd7] pb-4"
                >

                  <div>

                    <p className="font-medium text-[#2a2723]">
                      {item.product_name}
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#958a7e] mt-1">
                      ₹
                      {Number(
                        item.price
                      ).toLocaleString(
                        "en-IN"
                      )}{" "}
                      × {item.quantity}
                    </p>

                  </div>

                  <p className="font-medium whitespace-nowrap text-[#2a2723]">
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

          {/* Total */}
          <div className="flex justify-between items-end mt-6">

            <span className="text-[10px] uppercase tracking-[0.22em] text-[#766d63]">
              Total
            </span>

            <span className="font-serif text-2xl">
              ₹
              {Number(
                order.total_price
              ).toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="mt-6 flex flex-wrap gap-3">

          <Link
            to="/orders"
            className="px-6 py-3 rounded-full border border-[#d3cbc0] bg-white text-[10px] uppercase tracking-[0.18em] text-[#615a52] hover:border-black hover:text-black transition"
          >
            ← Back to Orders
          </Link>

          {canCancel && (
            <button
              type="button"
              onClick={
                handleCancelOrder
              }
              disabled={cancelling}
              className="px-6 py-3 rounded-full bg-[#9d5d56] text-white text-[10px] uppercase tracking-[0.18em] hover:bg-[#874e49] disabled:bg-[#c9a6a2] transition"
            >
              {cancelling
                ? "Cancelling..."
                : "Cancel Order"}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default OrderDetailsPage;

