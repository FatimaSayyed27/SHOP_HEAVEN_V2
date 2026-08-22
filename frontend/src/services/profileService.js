import { apiFetch } from "./apiClient";

export const getProfile = async () => {
  const response = await apiFetch("/api/profile/");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to load profile."
    );
  }

  return data;
};

export const updateProfile = async (profileData) => {
  const response = await apiFetch(
    "/api/profile/",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to update profile."
    );
  }

  return data;
};