import { refreshAccessToken } from "./authService";
import { logout } from "../utils/auth";

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

export const apiFetch = async (
  endpoint,
  options = {},
  retry = true
) => {
  let accessToken = localStorage.getItem("access_token");

  const headers = {
    ...(options.headers || {}),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response = await fetch(
    `${BASEURL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  if (response.status !== 401 || !retry) {
    return response;
  }

  try {
    const newAccessToken = await refreshAccessToken();

    response = await fetch(
      `${BASEURL}${endpoint}`,
      {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${newAccessToken}`,
        },
      }
    );

    if (response.status === 401) {
      logout();
    }

    return response;
  } catch (error) {
    logout();
    throw error;
  }
};