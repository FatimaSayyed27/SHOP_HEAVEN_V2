import { apiFetch } from "./apiClient";

// =========================
// BRANDS
// =========================

export const getAdminBrands = async () => {
  const response = await apiFetch(
    "/api/admin/brands/"
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to load brands."
    );
  }

  return data;
};

export const createAdminBrand = async (formData) => {
  const response = await apiFetch(
    "/api/admin/brands/",
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
        "Failed to create brand."
    );
  }

  return data;
};

export const updateAdminBrand = async (
  brandId,
  formData
) => {
  const response = await apiFetch(
    `/api/admin/brands/${brandId}/`,
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
        "Failed to update brand."
    );
  }

  return data;
};

export const deleteAdminBrand = async (brandId) => {
  const response = await apiFetch(
    `/api/admin/brands/${brandId}/`,
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
      data.detail ||
        "Failed to delete brand."
    );
  }

  return true;
};


// =========================
// CATEGORIES
// =========================

export const getAdminCategories = async () => {
  const response = await apiFetch(
    "/api/admin/categories/"
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        "Failed to load categories."
    );
  }

  return data;
};

export const createAdminCategory = async (
  formData
) => {
  const response = await apiFetch(
    "/api/admin/categories/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      Object.values(data)?.[0]?.[0] ||
        data.detail ||
        "Failed to create category."
    );
  }

  return data;
};

export const updateAdminCategory = async (
  categoryId,
  formData
) => {
  const response = await apiFetch(
    `/api/admin/categories/${categoryId}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      Object.values(data)?.[0]?.[0] ||
        data.detail ||
        "Failed to update category."
    );
  }

  return data;
};

export const deleteAdminCategory = async (
  categoryId
) => {
  const response = await apiFetch(
    `/api/admin/categories/${categoryId}/`,
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
      data.detail ||
        "Failed to delete category."
    );
  }

  return true;
};