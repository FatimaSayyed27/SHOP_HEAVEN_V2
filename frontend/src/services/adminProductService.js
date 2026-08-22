import { apiFetch } from "./apiClient";

export const getAdminProducts = async () => {
  const response = await apiFetch("/api/admin/products/");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to load admin products."
    );
  }

  return data;
};

export const createAdminProduct = async (formData) => {
  const response = await apiFetch(
    "/api/admin/products/",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      Object.values(data)?.[0]?.[0] ||
        data.detail ||
        "Failed to create product."
    );
  }

  return data;
};

export const updateAdminProduct = async (
  productId,
  formData
) => {
  const response = await apiFetch(
    `/api/admin/products/${productId}/`,
    {
      method: "PATCH",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      Object.values(data)?.[0]?.[0] ||
        data.detail ||
        "Failed to update product."
    );
  }

  return data;
};

export const deleteAdminProduct = async (
  productId
) => {
  const response = await apiFetch(
    `/api/admin/products/${productId}/`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    let data = {};

    try {
      data = await response.json();
    } catch {
      // Empty response
    }

    throw new Error(
      data.detail || "Failed to delete product."
    );
  }

  return true;
};

