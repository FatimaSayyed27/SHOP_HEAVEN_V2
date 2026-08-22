export const saveTokens = (data) => {
  localStorage.setItem(
    "access_token",
    data.access
  );

  localStorage.setItem(
    "refresh_token",
    data.refresh
  );

  localStorage.setItem(
    "is_staff",
    String(Boolean(data.is_staff))
  );

  localStorage.setItem(
    "is_superuser",
    String(Boolean(data.is_superuser))
  );
};

export const getAccessToken = () => {
  return localStorage.getItem(
    "access_token"
  );
};

export const getRefreshToken = () => {
  return localStorage.getItem(
    "refresh_token"
  );
};

export const logout = () => {
  localStorage.removeItem(
    "access_token"
  );

  localStorage.removeItem(
    "refresh_token"
  );

  localStorage.removeItem(
    "is_staff"
  );

  localStorage.removeItem(
    "is_superuser"
  );
};