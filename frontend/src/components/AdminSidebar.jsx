import { useState } from "react";
import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function AdminSidebar() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  // =====================================================
  // NAV LINK STYLE
  // =====================================================

  const navLinkClass = ({
    isActive,
  }) => `
    flex items-center
    w-full
    px-4 py-3.5
    rounded-xl
    text-[10px]
    uppercase
    tracking-[0.16em]
    font-medium
    transition
    ${
      isActive
        ? "bg-[#1b1917] text-white shadow-sm"
        : "text-[#6f675e] hover:bg-[#f3f0ea] hover:text-[#1b1917]"
    }
  `;

  return (
    <>
      {/* =================================================
          MOBILE HEADER
      ================================================= */}

      <div className="lg:hidden sticky top-0 z-50 w-full bg-[#fbfaf7]/95 backdrop-blur-xl border-b border-[#e7e0d7]">

        <div className="flex items-center justify-between px-4 py-4">

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="text-left"
          >
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
              Shop Haven
            </p>

            <p className="font-serif text-lg mt-1 text-[#1c1a18]">
              Admin Panel
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              setMenuOpen(true)
            }
            className="w-10 h-10 rounded-xl border border-[#d8d0c5] bg-white flex items-center justify-center text-[#4e4841] hover:border-black transition"
            aria-label="Open admin menu"
          >
            ☰
          </button>

        </div>
      </div>

      {/* =================================================
          DESKTOP SIDEBAR
      ================================================= */}

    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:min-w-[16rem] lg:max-w-[16rem] shrink-0 h-screen sticky top-0 bg-[#fbfaf7] border-r border-[#e4ddd4] overflow-y-auto">

        {/* BRAND */}
        <div className="px-6 pt-7 pb-6">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven
          </p>

          <h2 className="font-serif text-2xl mt-2 text-[#1c1a18]">
            Admin Panel
          </h2>

          <div className="w-10 h-px bg-[#b8995b] mt-4" />

        </div>

        {/* NAVIGATION */}
        <nav className="px-4 space-y-2">

          <NavLink
            to="/admin"
            end
            className={navLinkClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={navLinkClass}
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={navLinkClass}
          >
            Orders
          </NavLink>

          <NavLink
            to="/admin/catalog"
            className={navLinkClass}
          >
            Brands & Categories
          </NavLink>

        </nav>

        {/* BOTTOM */}
        <div className="mt-auto p-4">

          <div className="border-t border-[#e4ddd4] pt-4">

            <Link
              to="/"
              className="block px-4 py-3.5 rounded-xl text-[10px] uppercase tracking-[0.16em] text-[#6f675e] hover:bg-[#f3f0ea] hover:text-[#1b1917] transition"
            >
              View Store
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-3.5 rounded-xl text-[10px] uppercase tracking-[0.16em] text-[#9b625c] hover:bg-[#fdf0ef] transition mt-2"
            >
              Logout
            </button>

          </div>
        </div>
      </aside>

      {/* =================================================
          MOBILE OVERLAY + DRAWER
      ================================================= */}

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">

          {/* OVERLAY */}
          <button
            type="button"
            onClick={closeMenu}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            aria-label="Close admin menu"
          />

          {/* DRAWER */}
          <aside className="absolute left-0 top-0 bottom-0 w-[300px] max-w-[88vw] bg-[#fbfaf7] shadow-2xl overflow-y-auto">

            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-[#e5ded5]">

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  navigate("/admin");
                }}
                className="text-left"
              >
                <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
                  Shop Haven
                </p>

                <p className="font-serif text-xl mt-1 text-[#1c1a18]">
                  Admin Panel
                </p>
              </button>

              <button
                type="button"
                onClick={closeMenu}
                className="w-9 h-9 rounded-full border border-[#d8d0c5] flex items-center justify-center text-[#5e574f] hover:border-black transition"
                aria-label="Close admin menu"
              >
                ✕
              </button>

            </div>

            {/* DRAWER NAVIGATION */}
            <nav className="p-4 space-y-2">

              <NavLink
                to="/admin"
                end
                onClick={closeMenu}
                className={navLinkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/products"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Products
              </NavLink>

              <NavLink
                to="/admin/orders"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Orders
              </NavLink>

              <NavLink
                to="/admin/catalog"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Brands & Categories
              </NavLink>

            </nav>

            {/* DRAWER BOTTOM */}
            <div className="p-4 mt-5">

              <div className="border-t border-[#e5ded5] pt-4">

                <Link
                  to="/"
                  onClick={closeMenu}
                  className="block px-4 py-3.5 rounded-xl text-[10px] uppercase tracking-[0.16em] text-[#6f675e] hover:bg-[#f3f0ea] hover:text-black transition"
                >
                  View Store
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3.5 rounded-xl text-[10px] uppercase tracking-[0.16em] text-[#9b625c] hover:bg-[#fdf0ef] transition mt-2"
                >
                  Logout
                </button>

              </div>

            </div>

          </aside>
        </div>
      )}
    </>
  );
}

export default AdminSidebar;