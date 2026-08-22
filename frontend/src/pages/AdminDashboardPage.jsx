
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAdminDashboard,
} from "../services/adminDashboardService";

function AdminDashboardPage() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // FETCH DASHBOARD
  // =====================================================

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getAdminDashboard();

          setDashboard(data);
        } catch (err) {
          console.error(
            "Admin dashboard error:",
            err
          );

          setError(
            err.message ||
              "Failed to load dashboard."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchDashboard();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-6">

        <div className="text-center">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven Admin
          </p>

          <p className="font-serif text-2xl mt-3 text-[#1c1a18]">
            Loading dashboard
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
      <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-6">

        <div className="text-center max-w-md">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven Admin
          </p>

          <h1 className="font-serif text-3xl mt-4">
            Dashboard Unavailable
          </h1>

          <p className="text-sm text-[#756e65] mt-4 leading-6">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-7 bg-[#1b1917] text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // STATS
  // =====================================================

  const stats = [
    {
      label: "Total Products",
      value:
        dashboard.total_products,
    },
    {
      label: "Total Orders",
      value:
        dashboard.total_orders,
    },
    {
      label: "Total Users",
      value:
        dashboard.total_users,
    },
    {
      label: "Total Revenue",
      value: `₹${Number(
        dashboard.total_revenue
      ).toLocaleString(
        "en-IN"
      )}`,
    },
    {
      label: "Pending Orders",
      value:
        dashboard.pending_orders,
    },
    {
      label: "Low Stock",
      value:
        dashboard.low_stock_products,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#1c1a18] w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      <div className="w-full max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

          <div>

            <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
              Shop Haven Admin
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl mt-3">
              Dashboard
            </h1>

            <p className="text-sm text-[#756e65] mt-3">
              A refined overview of your store.
            </p>

          </div>

          <Link
            to="/"
            className="text-[9px] uppercase tracking-[0.2em] text-[#70685e] border-b border-[#b9ae9f] pb-1 hover:text-black hover:border-black transition"
          >
            View Store
          </Link>

        </div>

        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="grid grid-cols-2 xl:grid-cols-6 gap-3 sm:gap-4 mt-8">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-[#e7e0d7] rounded-2xl p-4 sm:p-5 hover:border-[#cfc5b8] transition"
            >

              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#968c82] leading-4">
                {stat.label}
              </p>

              <p className="font-serif text-2xl sm:text-3xl mt-3 text-[#1c1a18] break-words">
                {stat.value}
              </p>

            </div>
          ))}

        </div>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="mt-10">

          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
              Workspace
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl mt-2">
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-5">

            <Link
              to="/admin/products"
              className="group bg-[#1b1917] text-white p-5 sm:p-6 rounded-2xl hover:bg-black transition"
            >
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/60">
                Catalogue
              </p>

              <p className="font-serif text-xl sm:text-2xl mt-2">
                Manage Products
              </p>

              <span className="inline-block mt-5 text-[10px] uppercase tracking-[0.15em] text-white/70 group-hover:text-white transition">
                Open →
              </span>
            </Link>

            <Link
              to="/admin/orders"
              className="group bg-white border border-[#e7e0d7] p-5 sm:p-6 rounded-2xl hover:border-[#bdb2a3] transition"
            >
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#9a8666]">
                Fulfilment
              </p>

              <p className="font-serif text-xl sm:text-2xl mt-2">
                Manage Orders
              </p>

              <span className="inline-block mt-5 text-[10px] uppercase tracking-[0.15em] text-[#726a61]">
                Open →
              </span>
            </Link>

            <Link
              to="/admin/catalog"
              className="group col-span-2 lg:col-span-1 bg-white border border-[#e7e0d7] p-5 sm:p-6 rounded-2xl hover:border-[#bdb2a3] transition"
            >
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#9a8666]">
                Collection
              </p>

              <p className="font-serif text-xl sm:text-2xl mt-2">
                Brands & Categories
              </p>

              <span className="inline-block mt-5 text-[10px] uppercase tracking-[0.15em] text-[#726a61]">
                Open →
              </span>
            </Link>

          </div>

        </section>

        {/* =================================================
            RECENT ORDERS + LOW STOCK
        ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mt-10">

          {/* =================================================
              RECENT ORDERS
          ================================================= */}

          <section className="bg-white border border-[#e7e0d7] rounded-2xl p-5 sm:p-6">

            <div className="flex items-end justify-between gap-4">

              <div>

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                  Activity
                </p>

                <h2 className="font-serif text-2xl mt-2">
                  Recent Orders
                </h2>

              </div>

              <Link
                to="/admin/orders"
                className="text-[9px] uppercase tracking-[0.18em] text-[#71695f] border-b border-[#b8aea0] pb-1 hover:text-black hover:border-black transition whitespace-nowrap"
              >
                View All
              </Link>

            </div>

            <div className="mt-7 space-y-4">

              {dashboard.recent_orders?.length ? (
                dashboard.recent_orders.map(
                  (order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between gap-4 border-b border-[#eee9e2] pb-4 last:border-b-0 last:pb-0"
                    >

                      <div className="min-w-0">

                        <p className="font-serif text-base sm:text-lg truncate">
                          Order #{order.id}
                        </p>

                        <p className="text-[10px] uppercase tracking-[0.12em] text-[#968c82] mt-1 truncate">
                          {order.username}
                        </p>

                      </div>

                      <div className="text-right shrink-0">

                        <p className="text-sm font-medium">
                          ₹
                          {Number(
                            order.total_price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <p className="text-[9px] uppercase tracking-[0.12em] text-[#9a8666] mt-1">
                          {order.status}
                        </p>

                      </div>

                    </div>
                  )
                )
              ) : (
                <div className="py-6 text-center">

                  <p className="font-serif text-xl">
                    No Recent Orders
                  </p>

                  <p className="text-sm text-[#756e65] mt-2">
                    New orders will appear here.
                  </p>

                </div>
              )}

            </div>

          </section>

          {/* =================================================
              LOW STOCK
          ================================================= */}

          <section className="bg-white border border-[#e7e0d7] rounded-2xl p-5 sm:p-6">

            <div className="flex items-end justify-between gap-4">

              <div>

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                  Inventory
                </p>

                <h2 className="font-serif text-2xl mt-2">
                  Low Stock Products
                </h2>

              </div>

              <Link
                to="/admin/products"
                className="text-[9px] uppercase tracking-[0.18em] text-[#71695f] border-b border-[#b8aea0] pb-1 hover:text-black hover:border-black transition whitespace-nowrap"
              >
                Manage
              </Link>

            </div>

            <div className="mt-7 space-y-4">

              {dashboard.low_stock_items?.length ? (
                dashboard.low_stock_items.map(
                  (product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-4 border-b border-[#eee9e2] pb-4 last:border-b-0 last:pb-0"
                    >

                      <div className="min-w-0">

                        <p className="font-medium text-sm truncate">
                          {product.name}
                        </p>

                        <p className="text-[10px] uppercase tracking-[0.12em] text-[#968c82] mt-1 truncate">
                          {product.brand}
                        </p>

                      </div>

                      <span className="shrink-0 inline-flex px-3 py-1.5 rounded-full bg-[#f8e9e8] text-[#a15d57] text-[9px] uppercase tracking-[0.12em]">
                        {product.stock} Left
                      </span>

                    </div>
                  )
                )
              ) : (
                <div className="py-6 text-center">

                  <p className="font-serif text-xl">
                    Inventory Looks Good
                  </p>

                  <p className="text-sm text-[#756e65] mt-2">
                    No low-stock products at the moment.
                  </p>

                </div>
              )}

            </div>

          </section>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboardPage;

