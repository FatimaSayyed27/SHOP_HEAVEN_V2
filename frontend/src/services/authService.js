const BASEURL =
  import.meta.env.VITE_DJANGO_BASE_URL;

// =====================================================
// REGISTER
// =====================================================

export const registerUser = async (userData) => {
  const response = await fetch(
    `${BASEURL}/api/register/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const firstError =
      Object.values(data)?.[0];

    throw new Error(
      Array.isArray(firstError)
        ? firstError[0]
        : firstError ||
            "Registration failed."
    );
  }

  return data;
};

// =====================================================
// LOGIN
// =====================================================

export const loginUser = async (
  username,
  password
) => {
  const response = await fetch(
    `${BASEURL}/api/token/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        "Invalid username or password."
    );
  }

  return data;
};

// =====================================================
// REFRESH ACCESS TOKEN
// =====================================================

export const refreshAccessToken =
  async () => {
    const refreshToken =
      localStorage.getItem(
        "refresh_token"
      );

    if (!refreshToken) {
      throw new Error(
        "No refresh token available."
      );
    }

    const response = await fetch(
      `${BASEURL}/api/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail ||
          "Session expired. Please login again."
      );
    }

    localStorage.setItem(
      "access_token",
      data.access
    );

    // SimpleJWT rotation enabled hai
    if (data.refresh) {
      localStorage.setItem(
        "refresh_token",
        data.refresh
      );
    }

    return data.access;
  };