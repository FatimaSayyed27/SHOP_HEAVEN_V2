import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../Components/ProductCard";
import ProductGridSkeleton from "../Components/ProductGridSkeleton";

import {
  getProducts,
  getBrands,
  getCategories,
} from "../services/productService";

function ProductsPage() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  // =====================================================
  // DATA
  // =====================================================

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [totalProducts, setTotalProducts] =
    useState(0);

  const [hasNext, setHasNext] =
    useState(false);

  const [hasPrevious, setHasPrevious] =
    useState(false);

  // =====================================================
  // FILTER STATES
  // =====================================================

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [brand, setBrand] = useState(
    searchParams.get("brand") || ""
  );

  const [category, setCategory] =
    useState(
      searchParams.get("category") || ""
    );

  const [minPrice, setMinPrice] =
    useState(
      searchParams.get("min_price") || ""
    );

  const [maxPrice, setMaxPrice] =
    useState(
      searchParams.get("max_price") || ""
    );

  const [sortBy, setSortBy] =
    useState(
      searchParams.get("sort") || "default"
    );

  const [page, setPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  // =====================================================
  // UI STATES
  // =====================================================

  const [loading, setLoading] =
    useState(true);

  const [loadingFilters, setLoadingFilters] =
    useState(true);

  const [error, setError] = useState("");

  const [filterError, setFilterError] =
    useState("");

  // =====================================================
  // IMPORTANT:
  // URL → STATE SYNC
  // =====================================================

  useEffect(() => {
    setSearch(
      searchParams.get("search") || ""
    );

    setBrand(
      searchParams.get("brand") || ""
    );

    setCategory(
      searchParams.get("category") || ""
    );

    setMinPrice(
      searchParams.get("min_price") || ""
    );

    setMaxPrice(
      searchParams.get("max_price") || ""
    );

    setSortBy(
      searchParams.get("sort") || "default"
    );

    setPage(
      Number(searchParams.get("page")) || 1
    );
  }, [searchParams]);

  // =====================================================
  // FETCH BRANDS + CATEGORIES
  // =====================================================

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoadingFilters(true);
        setFilterError("");

        const [
          brandsData,
          categoriesData,
        ] = await Promise.all([
          getBrands(),
          getCategories(),
        ]);

        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(
          "Filter fetch error:",
          err
        );

        setFilterError(
          err.message ||
            "Failed to load filters."
        );
      } finally {
        setLoadingFilters(false);
      }
    };

    fetchFilters();
  }, []);

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts({
          search,
          brand,
          category,
          minPrice,
          maxPrice,
          sort: sortBy,
          page,
          pageSize: 12,
        });

        setProducts(data.results || []);

        setTotalProducts(
          data.count || 0
        );

        setHasNext(
          Boolean(data.next)
        );

        setHasPrevious(
          Boolean(data.previous)
        );
      } catch (err) {
        console.error(
          "Products fetch error:",
          err
        );

        setError(
          err.message ||
            "Unable to load products."
        );

        setProducts([]);
        setTotalProducts(0);
        setHasNext(false);
        setHasPrevious(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    search,
    brand,
    category,
    minPrice,
    maxPrice,
    sortBy,
    page,
  ]);

  // =====================================================
  // UPDATE URL
  // =====================================================

  const updateURL = (updates) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    Object.entries(updates).forEach(
      ([key, value]) => {
        if (
          value === "" ||
          value === null ||
          value === undefined
        ) {
          nextParams.delete(key);
        } else {
          nextParams.set(
            key,
            String(value)
          );
        }
      }
    );

    setSearchParams(nextParams);
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);

    updateURL({
      search: value,
      page: 1,
    });
  };

  // =====================================================
  // BRAND
  // =====================================================

  const handleBrandChange = (value) => {
    setBrand(value);
    setPage(1);

    updateURL({
      brand: value,
      page: 1,
    });
  };

  // =====================================================
  // CATEGORY
  // =====================================================

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);

    updateURL({
      category: value,
      page: 1,
    });
  };

  // =====================================================
  // MIN PRICE
  // =====================================================

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    setPage(1);

    updateURL({
      min_price: value,
      page: 1,
    });
  };

  // =====================================================
  // MAX PRICE
  // =====================================================

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    setPage(1);

    updateURL({
      max_price: value,
      page: 1,
    });
  };

  // =====================================================
  // SORT
  // =====================================================

  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1);

    updateURL({
      sort:
        value === "default"
          ? ""
          : value,
      page: 1,
    });
  };

  // =====================================================
  // PAGINATION
  // =====================================================

  const handlePrevious = () => {
    if (!hasPrevious) {
      return;
    }

    const newPage = Math.max(
      1,
      page - 1
    );

    setPage(newPage);

    updateURL({
      page: newPage,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (!hasNext) {
      return;
    }

    const newPage = page + 1;

    setPage(newPage);

    updateURL({
      page: newPage,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setBrand("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
    setPage(1);

    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#9c8d76]">
            Shop Haven
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl mt-3 text-[#1c1a18]">
            All Products
          </h1>

          <p className="text-sm text-[#7d766d] mt-3">
            Explore our curated collection.
          </p>
        </div>

        {/* =================================================
            FILTER BAR
        ================================================= */}

        <div className="bg-white border border-[#e8e1d7] rounded-2xl p-4 sm:p-5 mt-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">

            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                handleSearchChange(
                  e.target.value
                )
              }
              className="border border-[#ddd6cc] rounded-xl px-4 py-3 bg-white outline-none focus:border-[#1c1a18]"
            />

            {/* Brand */}
            <select
              value={brand}
              onChange={(e) =>
                handleBrandChange(
                  e.target.value
                )
              }
              disabled={loadingFilters}
              className="border border-[#ddd6cc] rounded-xl px-4 py-3 bg-white outline-none focus:border-[#1c1a18] disabled:bg-gray-100"
            >
              <option value="">
                All Brands
              </option>

              {brands.map((item) => (
                <option
                  key={item.id}
                  value={item.slug}
                >
                  {item.name}
                </option>
              ))}
            </select>

            {/* Category */}
            <select
              value={category}
              onChange={(e) =>
                handleCategoryChange(
                  e.target.value
                )
              }
              disabled={loadingFilters}
              className="border border-[#ddd6cc] rounded-xl px-4 py-3 bg-white outline-none focus:border-[#1c1a18] disabled:bg-gray-100"
            >
              <option value="">
                All Categories
              </option>

              {categories.map(
                (item) => (
                  <option
                    key={item.id}
                    value={item.slug}
                  >
                    {item.name}
                  </option>
                )
              )}
            </select>

            {/* Min Price */}
            <input
              type="number"
              min="0"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) =>
                handleMinPriceChange(
                  e.target.value
                )
              }
              className="border border-[#ddd6cc] rounded-xl px-4 py-3 bg-white outline-none focus:border-[#1c1a18]"
            />

            {/* Max Price */}
            <input
              type="number"
              min="0"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) =>
                handleMaxPriceChange(
                  e.target.value
                )
              }
              className="border border-[#ddd6cc] rounded-xl px-4 py-3 bg-white outline-none focus:border-[#1c1a18]"
            />

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) =>
                handleSortChange(
                  e.target.value
                )
              }
              className="border border-[#ddd6cc] rounded-xl px-4 py-3 bg-white outline-none focus:border-[#1c1a18]"
            >
              <option value="default">
                Sort: Default
              </option>

              <option value="price-low">
                Price: Low → High
              </option>

              <option value="price-high">
                Price: High → Low
              </option>

              <option value="newest">
                Newest
              </option>
            </select>

          </div>

          {/* Footer */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              {loading ? (
                <p className="text-sm text-[#9a9287]">
                  Loading products...
                </p>
              ) : (
                <p className="text-sm text-[#756e65]">
                  {totalProducts} product
                  {totalProducts !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </p>
              )}

              {filterError && (
                <p className="text-sm text-red-500 mt-2">
                  {filterError}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="text-[10px] uppercase tracking-[0.2em] font-medium underline underline-offset-4 text-[#6f675d] hover:text-black transition"
            >
              Clear Filters
            </button>

          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && !loading && (
          <div className="mt-10 bg-red-50 rounded-2xl p-8 text-center">
            <p className="text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* =================================================
            SKELETON
        ================================================= */}

        {loading && (
          <div className="mt-10">
            <ProductGridSkeleton count={12} />
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="bg-white border border-[#e8e1d7] rounded-2xl mt-10 p-12 text-center">

              <h2 className="font-serif text-2xl">
                No Products Found
              </h2>

              <p className="text-sm text-[#7d766d] mt-3">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 bg-[#1c1a18] text-white px-6 py-3 rounded-full text-sm hover:bg-black transition"
              >
                Clear Filters
              </button>

            </div>
          )}

        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        {!loading &&
          !error &&
          products.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-7 gap-y-12 mt-10">

                {products.map(
                  (product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  )
                )}

              </div>

              {/* =================================================
                  PAGINATION
              ================================================= */}

              <div className="mt-14 flex items-center justify-center gap-4">

                <button
                  type="button"
                  onClick={
                    handlePrevious
                  }
                  disabled={!hasPrevious}
                  className="px-5 py-3 rounded-full border border-[#d3ccc2] text-sm hover:border-black disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  ← Previous
                </button>

                <span className="min-w-20 text-center text-sm text-[#756e65]">
                  Page {page}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!hasNext}
                  className="px-5 py-3 rounded-full border border-[#d3ccc2] text-sm hover:border-black disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next →
                </button>

              </div>
            </>
          )}

      </div>
    </div>
  );
}

export default ProductsPage;

