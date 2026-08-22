const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

console.log("BASEURL =", BASEURL);

// =========================
// PRODUCTS
// =========================

export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.brand) {
    params.append("brand", filters.brand);
  }

  if (filters.category) {
    params.append("category", filters.category);
  }

  if (filters.minPrice) {
    params.append("min_price", filters.minPrice);
  }

  if (filters.maxPrice) {
    params.append("max_price", filters.maxPrice);
  }

  if (
    filters.sort &&
    filters.sort !== "default"
  ) {
    params.append("sort", filters.sort);
  }

  if (filters.page) {
    params.append("page", filters.page);
  }

  if (filters.pageSize) {
    params.append(
      "page_size",
      filters.pageSize
    );
  }

  const queryString = params.toString();

  const url = queryString
    ? `${BASEURL}/api/products/?${queryString}`
    : `${BASEURL}/api/products/`;

  console.log("FETCH URL =", url);

  const response = await fetch(url);

  console.log("STATUS =", response.status);
  console.log(
    "CONTENT TYPE =",
    response.headers.get("content-type")
  );

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status}`
    );
  }

  const data = await response.json();

  return data;
};


// =========================
// FEATURED PRODUCTS
// =========================

export const getFeaturedProducts = async () => {
  const data = await getProducts({
    pageSize: 100,
  });

  // Paginated API response
  if (data.results) {
    return data.results.filter(
      (product) =>
        product.is_featured === true
    );
  }

  // Safety for old non-paginated response
  if (Array.isArray(data)) {
    return data.filter(
      (product) =>
        product.is_featured === true
    );
  }

  return [];
};


// =========================
// SINGLE PRODUCT
// =========================

export const getProductById = async (id) => {
  const response = await fetch(
    `${BASEURL}/api/products/${id}/`
  );

  if (!response.ok) {
    throw new Error(
      "Product not found."
    );
  }

  return response.json();
};


// =========================
// BRANDS
// =========================

export const getBrands = async () => {
  const response = await fetch(
    `${BASEURL}/api/brands/`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch brands: ${response.status}`
    );
  }

  return response.json();
};


// =========================
// CATEGORIES
// =========================

export const getCategories = async () => {
  const response = await fetch(
    `${BASEURL}/api/categories/`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch categories: ${response.status}`
    );
  }

  return response.json();
};