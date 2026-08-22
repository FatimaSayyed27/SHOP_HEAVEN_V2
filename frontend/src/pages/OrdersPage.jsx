import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrders } from "../services/orderService";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token =
        localStorage.getItem("access_token");

      if (!token) {
        setError(
          "Please login to view your orders."
        );
        setLoading(false);
        return;
      }

      try {
        const data =
          await getOrders(token);

        setOrders(data);
      } catch (err) {
        console.error(
          "Orders error:",
          err
        );

        setError(
          err.message ||
            "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
            Loading your orders
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-3xl mt-4">
            Orders Unavailable
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

      <div className="max-w-5xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl mt-3">
            My Orders
          </h1>

          <p className="text-sm text-[#756e65] mt-3 leading-6">
            View and track your curated purchases.
          </p>

        </div>

        {/* =================================================
            EMPTY
        ================================================= */}

        {orders.length === 0 ? (
          <div className="bg-white border border-[#e8e1d7] rounded-2xl p-10 sm:p-14 text-center">

            <p className="text-[9px] uppercase tracking-[0.35em] text-[#9a8666]">
              Your Collection
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl mt-3">
              No Orders Yet
            </h2>

            <p className="text-sm text-[#756e65] mt-3 leading-6">
              Your placed orders will appear here.
            </p>

            <Link
              to="/products"
              className="inline-block mt-7 bg-[#1b1917] text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
            >
              Start Shopping
            </Link>

          </div>
        ) : (
          <div className="space-y-4">

            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block bg-white border border-[#e8e1d7] rounded-2xl p-5 sm:p-6 hover:border-[#cfc5b8] hover:-translate-y-[1px] transition"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  {/* ORDER */}
                  <div>

                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a8666]">
                      Order
                    </p>

                    <p className="font-serif text-lg mt-1 text-[#756e65]">
                      #{order.id}
                    </p>

                    <h2 className="font-serif text-2xl mt-2 text-[#1c1a18]">
                      ₹
                      {Number(
                        order.total_price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </h2>

                  </div>

                  {/* STATUS */}
                  <div>

                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#a09589] mb-2">
                      Status
                    </p>

                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#f3f0ea] border border-[#e4ddd3] text-[10px] uppercase tracking-[0.16em] text-[#5f574f]">
                      {order.status}
                    </span>

                  </div>

                  {/* DATE */}
                  <div className="md:text-right">

                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#a09589]">
                      Placed On
                    </p>

                    <p className="text-sm text-[#6f675d] mt-2">
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
                    </p>

                  </div>

                  {/* ARROW */}
                  <div className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-[#ddd5ca] text-[#6b6259]">
                    →
                  </div>

                </div>

              </Link>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default OrdersPage;

