import { apiFetch } from "./apiClient";

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

export const addToCart = async (
  productId,
  quantity
) => {
  const response = await apiFetch(
    "/api/cart/add/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: productId,
        quantity,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to add product to cart."
    );
  }

  return data;
};

export const getCart = async () => {
  const response = await apiFetch("/api/cart/");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to load cart."
    );
  }

  return data;
};

export const updateCartItem = async (itemId, quantity, token) => {
  const response = await fetch(
    `${BASEURL}/api/cart/items/${itemId}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to update cart item."
    );
  }

  return data;
};

export const removeCartItem = async (itemId, token) => {
  const response = await fetch(
    `${BASEURL}/api/cart/items/${itemId}/remove/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to remove cart item."
    );
  }

  return data;
};