import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const { isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const searchInputRef = useRef(null);

  // =========================
  // CLOSE MOBILE MENU ON ROUTE
  // =========================
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSearchValue("");
  }, [location.pathname]);

  // =========================
  // SEARCH FOCUS
  // =========================
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/login");
  };

  // =========================
  // SEARCH
  // =========================

const handleSearchSubmit = (e) => {
  e.preventDefault();

  const query = searchValue.trim();

  if (!query) {
    return;
  }

  // Search ke baad input clear
  setSearchValue("");

  // Overlay close
  setSearchOpen(false);

  // Results page
  navigate(
    `/products?search=${encodeURIComponent(query)}`
  );
};

const handleSearchClose = () => {
  setSearchOpen(false);
  setSearchValue("");
};


  return (
    <>
      {/* =================================================
          DESKTOP + MOBILE NAVBAR
      ================================================= */}
      <header className="sticky top-0 z-50 bg-[#fbfaf7]/95 backdrop-blur-xl border-b border-[#e8e2d9]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="h-[72px] flex items-center justify-between">
            {/* =========================
                LOGO
            ========================== */}
            <Link to="/" className="shrink-0 group">
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.12em] font-semibold text-[#171717] group-hover:text-[#6f6558] transition">
                  SHOP HAVEN
                </span>

                <span className="hidden sm:block text-[7px] uppercase tracking-[0.38em] text-[#a08d6e] mt-0.5">
                  Curated Luxury
                </span>
              </div>
            </Link>

            {/* =========================
                DESKTOP NAV LINKS
            ========================== */}
            <nav className="hidden lg:flex items-center gap-9">
              <Link
                to="/"
                className="text-[11px] uppercase tracking-[0.16em] text-[#4d4943] hover:text-black transition"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-[11px] uppercase tracking-[0.16em] text-[#4d4943] hover:text-black transition"
              >
                Shop
              </Link>

              <Link
                to="/brands"
                className="text-[11px] uppercase tracking-[0.16em] text-[#4d4943] hover:text-black transition"
              >
                Brands
              </Link>
            </nav>

            {/* =========================
                DESKTOP ACTIONS
            ========================== */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#4b4741] hover:bg-white hover:shadow-sm transition"
                aria-label="Search"
              >
                <span className="text-lg">⌕</span>
              </button>

              {isAuthenticated && (
                <>
                  {/* Account */}
                  <Link
                    to="/profile"
                    className="px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#4d4943] hover:text-black transition"
                  >
                    Account
                  </Link>

                  {/* Orders */}
                  <Link
                    to="/orders"
                    className="px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#4d4943] hover:text-black transition"
                  >
                    Orders
                  </Link>
                </>
              )}

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#4b4741] hover:bg-white hover:shadow-sm transition"
                aria-label="Wishlist"
              >
                <span className="text-lg">♡</span>

                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 min-w-4 h-4 px-1 rounded-full bg-[#1b1a18] text-white text-[9px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#4b4741] hover:bg-white hover:shadow-sm transition"
                aria-label="Cart"
              >
                <span className="text-lg">🛒</span>

                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 min-w-4 h-4 px-1 rounded-full bg-[#b89455] text-white text-[9px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Login / Logout */}
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#82796e] hover:text-black transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="ml-2 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#82796e] hover:text-black transition"
                >
                  Login
                </Link>
              )}
            </div>

            {/* =========================
                MOBILE ACTIONS
            ========================== */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition"
                aria-label="Search"
              >
                ⌕
              </button>

              <Link
                to="/cart"
                className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition"
                aria-label="Cart"
              >
                🛒
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 min-w-4 h-4 px-1 rounded-full bg-[#b89455] text-white text-[9px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 rounded-full border border-[#ddd6cc] flex items-center justify-center hover:bg-white transition"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =================================================
          SEARCH OVERLAY
      ================================================= */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 bg-[#fbfaf7] border-b border-[#e8e2d9] shadow-xl">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 py-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#9d8d74]">
                    Shop Haven
                  </p>

                  <h2 className="font-serif text-2xl mt-1">
                    Search Collection
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleSearchClose}
                  className="w-10 h-10 rounded-full border border-[#ddd6cc] flex items-center justify-center hover:bg-white"
                  aria-label="Close search"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center border-b-2 border-[#1d1b18]">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search bags, shoes, perfumes..."
                    className="flex-1 bg-transparent outline-none py-4 text-lg placeholder:text-[#a09a90]"
                  />

                  <button
                    type="submit"
                    className="text-[10px] uppercase tracking-[0.2em] font-medium px-4"
                  >
                    Search
                  </button>
                </div>
              </form>

              <p className="text-xs text-[#8d857a] mt-4">
                Search by product name, collection or brand.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          MOBILE DRAWER
      ================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden">
          {/* Overlay */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            aria-label="Close menu"
          />

          {/* Drawer */}
          <aside className="absolute right-0 top-0 bottom-0 w-[320px] max-w-[88vw] bg-[#fbfaf7] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e6dfd6]">
              <div>
                <p className="font-serif text-lg tracking-[0.12em] font-semibold">
                  SHOP HAVEN
                </p>

                <p className="text-[8px] uppercase tracking-[0.3em] text-[#9d8d74] mt-1">
                  Curated Luxury
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full border border-[#d9d1c7] flex items-center justify-center"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <nav className="px-6 py-8 space-y-2">
              <Link
                to="/"
                className="block py-4 border-b border-[#ebe5dd] font-serif text-xl"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="block py-4 border-b border-[#ebe5dd] font-serif text-xl"
              >
                Shop
              </Link>

              <Link
                to="/brands"
                className="block py-4 border-b border-[#ebe5dd] font-serif text-xl"
              >
                Brands
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    className="block py-4 border-b border-[#ebe5dd] font-serif text-xl"
                  >
                    Account
                  </Link>

                  <Link
                    to="/orders"
                    className="block py-4 border-b border-[#ebe5dd] font-serif text-xl"
                  >
                    Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between py-4 border-b border-[#ebe5dd] font-serif text-xl"
                  >
                    <span>Wishlist</span>

                    {wishlistCount > 0 && (
                      <span className="text-xs font-sans bg-black text-white rounded-full px-2 py-1">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              <Link
                to="/cart"
                className="flex items-center justify-between py-4 border-b border-[#ebe5dd] font-serif text-xl"
              >
                <span>Cart</span>

                {cartCount > 0 && (
                  <span className="text-xs font-sans bg-[#b89455] text-white rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>

            {/* Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#e6dfd6]">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-3 rounded-full border border-[#d6cec2] text-[10px] uppercase tracking-[0.2em] text-[#6f675e]"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block text-center w-full py-3 rounded-full bg-[#1a1917] text-white text-[10px] uppercase tracking-[0.2em]"
                >
                  Login
                </Link>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default Navbar;
