import { apiFetch } from "./apiClient";

export const getWishlist = async () => {
  const response = await apiFetch("/api/wishlist/");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to load wishlist."
    );
  }

  return data;
};

export const addToWishlist = async (productId) => {
  const response = await apiFetch(
    "/api/wishlist/add/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: productId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to add product to wishlist."
    );
  }

  return data;
};

export const removeFromWishlist = async (itemId) => {
  const response = await apiFetch(
    `/api/wishlist/items/${itemId}/remove/`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to remove wishlist item."
    );
  }

  return data;
};