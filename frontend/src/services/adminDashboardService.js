import { apiFetch } from "./apiClient";

export const getAdminDashboard = async () => {
  const response = await apiFetch(
    "/api/admin/dashboard/"
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        "Failed to load admin dashboard."
    );
  }

  return data;
};