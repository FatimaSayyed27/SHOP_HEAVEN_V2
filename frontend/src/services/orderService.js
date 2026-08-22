import { apiFetch } from "./apiClient";

export const placeOrder = async (
  shippingAddress,
  paymentMethod
) => {
  const response = await apiFetch(
    "/api/orders/place/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to place order."
    );
  }

  return data;
};

export const getOrders = async () => {
  const response = await apiFetch("/api/orders/");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to load orders."
    );
  }

  return data;
};

export const getOrderById = async (orderId) => {
  const response = await apiFetch(
    `/api/orders/${orderId}/`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to load order."
    );
  }

  return data;
};

export const cancelOrder = async (orderId) => {
  const response = await apiFetch(
    `/api/orders/${orderId}/cancel/`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to cancel order."
    );
  }

  return data;
};

export const updateOrderStatus = async (
  orderId,
  newStatus
) => {
  const response = await apiFetch(
    `/api/admin/orders/${orderId}/status/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to update order status."
    );
  }

  return data;
};

export const getAdminOrders = async () => {
  const response = await apiFetch("/api/admin/orders/");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to load admin orders."
    );
  }

  return data;
};

