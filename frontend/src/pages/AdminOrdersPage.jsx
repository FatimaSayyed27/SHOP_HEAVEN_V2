import { useEffect, useState } from "react";

import {
  getAdminOrders,
  updateOrderStatus,
} from "../services/orderService";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] =
    useState(null);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminOrders();

      setOrders(data);
    } catch (err) {
      console.error(
        "Admin orders error:",
        err
      );

      setError(
        err.message ||
          "Failed to load admin orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =====================================================
  // STATUS UPDATE
  // =====================================================

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    try {
      setUpdatingOrder(orderId);
      setError("");

      const updatedOrder =
        await updateOrderStatus(
          orderId,
          newStatus
        );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id
            ? updatedOrder
            : order
        )
      );
    } catch (err) {
      console.error(
        "Order status update error:",
        err
      );

      setError(
        err.message ||
          "Failed to update order."
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-[#f5efe0] text-[#8b7446]";

      case "CONFIRMED":
        return "bg-[#e9eef4] text-[#5d7189]";

      case "SHIPPED":
        return "bg-[#eee9f4] text-[#75618c]";

      case "DELIVERED":
        return "bg-[#e8f0e5] text-[#687b60]";

      case "CANCELLED":
        return "bg-[#f8e9e8] text-[#a15d57]";

      default:
        return "bg-[#efede8] text-[#6f675d]";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center">

        <div className="text-center">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven Admin
          </p>

          <p className="font-serif text-2xl mt-3 text-[#1c1a18]">
            Loading orders
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f2] px-5 sm:px-8 lg:px-10 py-12 sm:py-16">

      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div>

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven Admin
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl mt-3 text-[#1c1a18]">
            Orders
          </h1>

          <p className="text-sm text-[#756e65] mt-3">
            Manage customer orders and update
            their fulfilment status.
          </p>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mt-6 bg-[#fdf0ef] border border-[#efd9d5] text-[#a45d55] p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* =================================================
            DESKTOP TABLE
        ================================================= */}

        <div className="hidden md:block mt-8 bg-white border border-[#e7e0d7] rounded-2xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="border-b border-[#e7e0d7] bg-[#faf8f4]">

                <tr>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Order
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Customer
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Total
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Payment
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Status
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => {

                  const updating =
                    updatingOrder ===
                    order.id;

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-[#eee9e2] last:border-b-0 hover:bg-[#fcfaf7] transition"
                    >

                      {/* ORDER */}
                      <td className="px-5 py-5">

                        <p className="font-serif text-lg text-[#1c1a18]">
                          #{order.id}
                        </p>

                      </td>

                      {/* CUSTOMER */}
                      <td className="px-5 py-5">

                        <p className="text-sm font-medium text-[#322e29]">
                          {order.user?.username ||
                            "Customer"}
                        </p>

                      </td>

                      {/* TOTAL */}
                      <td className="px-5 py-5">

                        <p className="font-medium text-[#2a2723]">
                          ₹
                          {Number(
                            order.total_price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </td>

                      {/* PAYMENT */}
                      <td className="px-5 py-5">

                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#746b62]">
                          {order.payment_method}
                        </p>

                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          <span
                            className={`inline-flex px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[0.12em] font-medium ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>

                          <select
                            value={
                              order.status
                            }
                            disabled={
                              updating
                            }
                            onChange={(
                              e
                            ) =>
                              handleStatusChange(
                                order.id,
                                e.target
                                  .value
                              )
                            }
                            className="border border-[#d8d0c5] rounded-lg px-2.5 py-2 bg-white text-xs outline-none focus:border-[#1c1a18] disabled:opacity-50"
                            aria-label={`Update status for order ${order.id}`}
                          >
                            <option value="PENDING">
                              PENDING
                            </option>

                            <option value="CONFIRMED">
                              CONFIRMED
                            </option>

                            <option value="SHIPPED">
                              SHIPPED
                            </option>

                            <option value="DELIVERED">
                              DELIVERED
                            </option>

                            <option value="CANCELLED">
                              CANCELLED
                            </option>
                          </select>

                        </div>

                      </td>

                      {/* DATE */}
                      <td className="px-5 py-5 text-[#756e65]">

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

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

          {/* EMPTY */}
          {orders.length === 0 && (
            <div className="p-12 text-center">

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                Orders
              </p>

              <h2 className="font-serif text-2xl mt-2">
                No Orders Found
              </h2>

              <p className="text-sm text-[#756e65] mt-2">
                New customer orders will appear here.
              </p>

            </div>
          )}

        </div>

        {/* =================================================
            MOBILE ORDER CARDS
        ================================================= */}

        <div className="md:hidden mt-8 space-y-4">

          {orders.map((order) => {

            const updating =
              updatingOrder ===
              order.id;

            return (
              <div
                key={order.id}
                className="bg-white border border-[#e7e0d7] rounded-2xl p-5"
              >

                {/* Top */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a8666]">
                      Order
                    </p>

                    <p className="font-serif text-xl mt-1">
                      #{order.id}
                    </p>

                  </div>

                  <span
                    className={`inline-flex px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[0.12em] font-medium ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* Info */}
                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div>

                    <p className="text-[8px] uppercase tracking-[0.18em] text-[#9a9085]">
                      Customer
                    </p>

                    <p className="text-sm font-medium mt-1">
                      {order.user?.username ||
                        "Customer"}
                    </p>

                  </div>

                  <div>

                    <p className="text-[8px] uppercase tracking-[0.18em] text-[#9a9085]">
                      Total
                    </p>

                    <p className="text-sm font-medium mt-1">
                      ₹
                      {Number(
                        order.total_price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                  <div>

                    <p className="text-[8px] uppercase tracking-[0.18em] text-[#9a9085]">
                      Payment
                    </p>

                    <p className="text-[10px] uppercase tracking-[0.12em] mt-1 text-[#6f675d]">
                      {order.payment_method}
                    </p>

                  </div>

                  <div>

                    <p className="text-[8px] uppercase tracking-[0.18em] text-[#9a9085]">
                      Date
                    </p>

                    <p className="text-sm mt-1 text-[#6f675d]">
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

                </div>

                {/* Status control */}
                <div className="mt-6 pt-5 border-t border-[#eee9e2]">

                  <p className="text-[8px] uppercase tracking-[0.18em] text-[#9a9085] mb-2">
                    Update Status
                  </p>

                  <select
                    value={order.status}
                    disabled={
                      updating
                    }
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value
                      )
                    }
                    className="w-full border border-[#d8d0c5] rounded-xl px-3.5 py-3 bg-white text-sm outline-none focus:border-[#1c1a18] disabled:opacity-50"
                  >
                    <option value="PENDING">
                      PENDING
                    </option>

                    <option value="CONFIRMED">
                      CONFIRMED
                    </option>

                    <option value="SHIPPED">
                      SHIPPED
                    </option>

                    <option value="DELIVERED">
                      DELIVERED
                    </option>

                    <option value="CANCELLED">
                      CANCELLED
                    </option>
                  </select>

                </div>

              </div>
            );
          })}

          {orders.length === 0 && (
            <div className="bg-white border border-[#e7e0d7] rounded-2xl p-10 text-center">

              <p className="font-serif text-2xl">
                No Orders Found
              </p>

              <p className="text-sm text-[#756e65] mt-2">
                New customer orders will appear here.
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminOrdersPage;
