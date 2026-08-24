import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  getBrands,
  getCategories,
  getProducts,
} from "../services/productService";

import getImageUrl from "../utils/imageUrl";

import ProductCard from "../components/ProductCard";
import ProductGridSkeleton from "../components/ProductGridSkeleton";
import BrandAmbassadorSection from "../components/BrandAmbassadorSection";

function BrandProductsPage() {
  const { slug } = useParams();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL;

  // =====================================================
  // DATA
  // =====================================================

  const [brand, setBrand] = useState(null);
  const [categories, setCategories] =
    useState([]);

  const [products, setProducts] = useState([]);

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

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // URL -> STATE SYNC
  // =====================================================

  useEffect(() => {
    setSearch(
      searchParams.get("search") || ""
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
  // UPDATE URL
  // =====================================================

  const updateURL = (updates) => {
    const nextParams =
      new URLSearchParams(searchParams);

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
  // FETCH BRAND + CATEGORIES + PRODUCTS
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const fetchBrandPage = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          brandsData,
          categoriesData,
          productsData,
        ] = await Promise.all([
          getBrands(),
          getCategories(),
          getProducts({
            search,
            brand: slug,
            category,
            minPrice,
            maxPrice,
            sort: sortBy,
            page,
            pageSize: 12,
          }),
        ]);

        if (cancelled) {
          return;
        }

        const currentBrand =
          brandsData.find(
            (item) =>
              item.slug === slug
          );

        if (!currentBrand) {
          setBrand(null);
          setCategories([]);
          setProducts([]);
          setTotalProducts(0);
          setHasNext(false);
          setHasPrevious(false);
          setError("Brand not found.");
          return;
        }

        setBrand(currentBrand);

        setCategories(
          categoriesData || []
        );

        setProducts(
          productsData?.results || []
        );

        setTotalProducts(
          productsData?.count || 0
        );

        setHasNext(
          Boolean(productsData?.next)
        );

        setHasPrevious(
          Boolean(
            productsData?.previous
          )
        );
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Brand page error:",
          err
        );

        setError(
          err.message ||
            "Failed to load brand products."
        );

        setProducts([]);
        setTotalProducts(0);
        setHasNext(false);
        setHasPrevious(false);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBrandPage();

    return () => {
      cancelled = true;
    };
  }, [
    slug,
    search,
    category,
    minPrice,
    maxPrice,
    sortBy,
    page,
  ]);

  // =====================================================
  // FILTER HANDLERS
  // =====================================================

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);

    updateURL({
      search: value,
      page: 1,
    });
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);

    updateURL({
      category: value,
      page: 1,
    });
  };

  const handleMinPriceChange = (
    value
  ) => {
    setMinPrice(value);
    setPage(1);

    updateURL({
      min_price: value,
      page: 1,
    });
  };

  const handleMaxPriceChange = (
    value
  ) => {
    setMaxPrice(value);
    setPage(1);

    updateURL({
      max_price: value,
      page: 1,
    });
  };

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
  // CLEAR FILTERS
  // =====================================================

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
    setPage(1);
    setFilterOpen(false);

    setSearchParams({});
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
  // BRAND NOT FOUND
  // =====================================================

  if (!loading && error && !brand) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex items-center justify-center px-6">
        <div className="text-center max-w-md">

          <p className="text-[10px] uppercase tracking-[0.4em] text-[#9c8d76]">
            Shop Haven
          </p>

          <h1 className="font-serif text-4xl mt-4">
            Brand Not Found
          </h1>

          <p className="text-sm text-[#746e65] mt-4 leading-6">
            {error}
          </p>

          <Link
            to="/brands"
            className="inline-flex mt-7 bg-[#1b1917] text-white px-7 py-3 rounded-full text-sm hover:bg-black transition"
          >
            Browse Brands
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#1c1a18]">

      {/* =====================================================
          BRAND HERO
      ===================================================== */}

      <section className="bg-[#f2eee7] border-b border-[#e7dfd4]">

        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 py-16 sm:py-20 lg:py-24">

          <div className="min-h-[520px] flex items-center justify-center">

            <div className="w-full max-w-2xl text-center">

              {/* THE HOUSE */}
              <div className="flex items-center justify-center gap-3">

                <span className="w-8 h-px bg-[#b8995b]" />

                <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8464]">
                  The House
                </p>

                <span className="w-8 h-px bg-[#b8995b]" />

              </div>

              {/* BRAND LOGO */}
              {brand?.logo && (
                <div className="mx-auto mt-8 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border border-[#ded6ca] flex items-center justify-center overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.04)]">

             <img
  src={getImageUrl(brand.logo)}
  alt={`${brand.name} logo`}
  className="w-full h-full object-contain p-5"
/>

                </div>
              )}

              {/* BRAND NAME */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-none mt-7 text-[#22201d]">
                {brand?.name}
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-7 max-w-xl mx-auto text-sm sm:text-base leading-7 text-[#716a61]">
                {brand?.description ||
                  `Discover the curated collection from ${brand?.name}, bringing together timeless design, craftsmanship and contemporary luxury.`}
              </p>

              {/* META */}
              <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 mt-8">

                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8d8171]">
                  {totalProducts}{" "}
                  {totalProducts === 1
                    ? "Piece"
                    : "Pieces"}
                </span>

                <span className="w-1 h-1 rounded-full bg-[#b8995b]" />

                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8d8171]">
                  Curated Collection
                </span>

              </div>

              {/* Decorative line */}
              <div className="flex justify-center mt-10">
                <span className="w-16 h-px bg-[#c6b69f]" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          AMBASSADOR SECTION
      ===================================================== */}

      <BrandAmbassadorSection
        brand={brand}
      />

      {/* =====================================================
          COLLECTION HEADER + CATEGORIES
      ===================================================== */}

      <section className="bg-[#fbfaf7]">

        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 pt-16 sm:pt-20">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

            <div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#9c8d76]">
                Explore
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl mt-2">
                {brand?.name} Collection
              </h2>
            </div>

            <p className="text-sm text-[#7d766d]">
              {totalProducts}{" "}
              {totalProducts === 1
                ? "piece"
                : "pieces"}
            </p>

          </div>

          {/* =================================================
              HORIZONTAL CATEGORY TABS
          ================================================= */}

          <div className="mt-10 -mx-6 sm:-mx-10 lg:-mx-12 border-y border-[#e8e1d7] bg-[#f8f6f2]">

            <div className="overflow-x-auto scrollbar-hide">

              <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">

                <div className="flex items-center gap-7 min-w-max py-5">

                  {/* ALL */}
                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryChange("")
                    }
                    className={`relative py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                      category === ""
                        ? "text-[#1b1917]"
                        : "text-[#857d73] hover:text-[#1b1917]"
                    }`}
                  >
                    All

                    {category === "" && (
                      <span className="absolute left-0 right-0 bottom-0 h-px bg-[#b8995b]" />
                    )}
                  </button>

                  {/* CATEGORIES */}
                  {categories.map(
                    (item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          handleCategoryChange(
                            item.slug
                          )
                        }
                        className={`relative py-2 text-[10px] uppercase tracking-[0.22em] transition ${
                          category ===
                          item.slug
                            ? "text-[#1b1917]"
                            : "text-[#857d73] hover:text-[#1b1917]"
                        }`}
                      >
                        {item.name}

                        {category ===
                          item.slug && (
                          <span className="absolute left-0 right-0 bottom-0 h-px bg-[#b8995b]" />
                        )}
                      </button>
                    )
                  )}

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          PRODUCTS SECTION
      ===================================================== */}

      <section className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-12">

        {/* Products Header */}
        <div className="flex items-center justify-between gap-4 mb-7">

          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
              Collection
            </p>

            <p className="text-sm text-[#756e65] mt-1">
              {loading
                ? "Curating pieces..."
                : `${totalProducts} ${
                    totalProducts === 1
                      ? "piece"
                      : "pieces"
                  }`}
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* Mobile filter button */}
            <button
              type="button"
              onClick={() =>
                setFilterOpen(true)
              }
              className="lg:hidden px-4 py-2.5 rounded-full border border-[#d3cbc0] text-[10px] uppercase tracking-[0.16em] bg-white"
            >
              Filter & Sort
            </button>

            <Link
              to="/products"
              className="text-[9px] uppercase tracking-[0.2em] text-[#6d655c] border-b border-[#b7aa9a] pb-1 hover:text-black hover:border-black transition"
            >
              Shop All
            </Link>

          </div>
        </div>

        {/* =================================================
            SHOPPING AREA
        ================================================= */}

        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-10">

          {/* =================================================
              DESKTOP FILTER SIDEBAR
          ================================================= */}

          <aside className="hidden lg:block bg-white border border-[#e8e1d7] rounded-2xl p-5 h-fit lg:sticky lg:top-24">

            <div className="flex items-center justify-between gap-4">

              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                  Refine
                </p>

                <h3 className="font-serif text-2xl mt-1">
                  Filters
                </h3>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="text-[9px] uppercase tracking-[0.14em] text-[#7c7267] underline underline-offset-4 hover:text-black"
              >
                Clear
              </button>

            </div>

            <div className="mt-7 space-y-6">

              {/* SEARCH */}
              <div>

                <label className="text-[9px] uppercase tracking-[0.2em] text-[#8e857a]">
                  Search
                </label>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    handleSearchChange(
                      e.target.value
                    )
                  }
                  placeholder="Search collection..."
                  className="mt-3 w-full border border-[#ddd5ca] rounded-xl px-3.5 py-3 text-sm bg-white outline-none focus:border-[#1c1a18]"
                />

              </div>

              {/* PRICE */}
              <div>

                <label className="text-[9px] uppercase tracking-[0.2em] text-[#8e857a]">
                  Price Range
                </label>

                <div className="grid grid-cols-2 gap-2 mt-3">

                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e) =>
                      handleMinPriceChange(
                        e.target.value
                      )
                    }
                    placeholder="Min"
                    className="w-full border border-[#ddd5ca] rounded-xl px-3 py-3 text-sm outline-none focus:border-[#1c1a18]"
                  />

                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(e) =>
                      handleMaxPriceChange(
                        e.target.value
                      )
                    }
                    placeholder="Max"
                    className="w-full border border-[#ddd5ca] rounded-xl px-3 py-3 text-sm outline-none focus:border-[#1c1a18]"
                  />

                </div>

              </div>

              {/* SORT */}
              <div>

                <label className="text-[9px] uppercase tracking-[0.2em] text-[#8e857a]">
                  Sort By
                </label>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    handleSortChange(
                      e.target.value
                    )
                  }
                  className="mt-3 w-full border border-[#ddd5ca] rounded-xl px-3.5 py-3 text-sm bg-white outline-none focus:border-[#1c1a18]"
                >
                  <option value="default">
                    Recommended
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="newest">
                    Newest
                  </option>
                </select>

              </div>

            </div>
          </aside>

          {/* =================================================
              PRODUCT CONTENT
          ================================================= */}

          <div className="min-w-0">

            {/* ERROR */}
            {error && brand && (
              <div className="bg-red-50 text-red-500 rounded-xl p-4 mb-7 text-sm">
                {error}
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <ProductGridSkeleton count={12} />
            )}

            {/* EMPTY */}
            {!loading &&
              !error &&
              products.length === 0 && (
                <div className="bg-white border border-[#e8e1d7] rounded-2xl p-12 text-center">

                  <h3 className="font-serif text-2xl">
                    Nothing matched
                  </h3>

                  <p className="text-sm text-[#7d766d] mt-3">
                    Try another search or adjust
                    your filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 bg-[#1b1917] text-white px-6 py-3 rounded-full text-sm"
                  >
                    Clear Filters
                  </button>

                </div>
              )}

            {/* PRODUCT GRID */}
            {!loading &&
              !error &&
              products.length > 0 && (
                <>
               <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-10 sm:gap-y-12">
  {products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))}
</div>

                  {/* PAGINATION */}
                  <div className="mt-14 flex items-center justify-center gap-4">

                    <button
                      type="button"
                      onClick={
                        handlePrevious
                      }
                      disabled={
                        !hasPrevious
                      }
                      className="px-5 py-3 rounded-full border border-[#d3cbc0] text-sm hover:border-black disabled:opacity-40 disabled:cursor-not-allowed transition"
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
                      className="px-5 py-3 rounded-full border border-[#d3cbc0] text-sm hover:border-black disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Next →
                    </button>

                  </div>
                </>
              )}

          </div>
        </div>
      </section>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ===================================================== */}

      {filterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          {/* Overlay */}
          <button
            type="button"
            onClick={() =>
              setFilterOpen(false)
            }
            className="absolute inset-0 bg-black/40"
            aria-label="Close filters"
          />

          {/* Drawer */}
          <aside className="absolute right-0 top-0 bottom-0 w-[320px] max-w-[90vw] bg-[#fbfaf7] shadow-2xl overflow-y-auto">

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e6dfd6]">

              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                  Refine
                </p>

                <h3 className="font-serif text-2xl mt-1">
                  Filter & Sort
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFilterOpen(false)
                }
                className="w-9 h-9 rounded-full border border-[#d9d1c7] flex items-center justify-center"
              >
                ✕
              </button>

            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-7">

              {/* Search */}
              <div>

                <label className="text-[9px] uppercase tracking-[0.2em] text-[#8e857a]">
                  Search
                </label>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    handleSearchChange(
                      e.target.value
                    )
                  }
                  placeholder="Search collection..."
                  className="mt-3 w-full border border-[#ddd5ca] rounded-xl px-3.5 py-3 text-sm bg-white outline-none focus:border-black"
                />

              </div>

              {/* Price */}
              <div>

                <label className="text-[9px] uppercase tracking-[0.2em] text-[#8e857a]">
                  Price Range
                </label>

                <div className="grid grid-cols-2 gap-2 mt-3">

                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e) =>
                      handleMinPriceChange(
                        e.target.value
                      )
                    }
                    placeholder="Min"
                    className="w-full border border-[#ddd5ca] rounded-xl px-3 py-3 text-sm outline-none focus:border-black"
                  />

                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(e) =>
                      handleMaxPriceChange(
                        e.target.value
                      )
                    }
                    placeholder="Max"
                    className="w-full border border-[#ddd5ca] rounded-xl px-3 py-3 text-sm outline-none focus:border-black"
                  />

                </div>

              </div>

              {/* Sort */}
              <div>

                <label className="text-[9px] uppercase tracking-[0.2em] text-[#8e857a]">
                  Sort By
                </label>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    handleSortChange(
                      e.target.value
                    )
                  }
                  className="mt-3 w-full border border-[#ddd5ca] rounded-xl px-3.5 py-3 text-sm bg-white outline-none focus:border-black"
                >
                  <option value="default">
                    Recommended
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="newest">
                    Newest
                  </option>
                </select>

              </div>

              {/* Clear */}
              <button
                type="button"
                onClick={clearFilters}
                className="w-full py-3 rounded-full border border-[#d3cbc0] text-[10px] uppercase tracking-[0.2em]"
              >
                Clear Filters
              </button>

              {/* Apply */}
              <button
                type="button"
                onClick={() =>
                  setFilterOpen(false)
                }
                className="w-full py-3 rounded-full bg-[#1b1917] text-white text-[10px] uppercase tracking-[0.2em]"
              >
                View Collection
              </button>

            </div>
          </aside>
        </div>
      )}

      {/* =====================================================
          BRAND FOOTER STATEMENT
      ===================================================== */}

      <section className="bg-[#171614] text-white">

        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-4 text-center">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#b8995b]">
            Shop Haven
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl mt-4">
            Timeless pieces.
            <span className="italic font-light">
              {" "}Exceptional stories.
            </span>
          </h2>

          <p className="text-sm leading-7 text-white/60 max-w-xl mx-auto mt-5">
            Discover the signature pieces and
            distinctive craftsmanship of{" "}
            {brand?.name}.
          </p>

        </div>
      </section>

    </div>
  );
}

export default BrandProductsPage;

