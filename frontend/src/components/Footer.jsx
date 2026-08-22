import { Link } from "react-router-dom";
import { useState } from "react";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    const value = email.trim();

    if (!value) {
      setMessage("Please enter your email.");
      return;
    }

    setMessage("Thank you. You're on the list.");

    setEmail("");
  };

  return (
    <footer className="bg-[#171614] text-[#e9e4dc]">
      {/* =========================
          MAIN FOOTER
      ========================== */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr] gap-10 lg:gap-16">
          {/* =========================
              BRAND
          ========================== */}
          <div className="max-w-sm">
            <Link to="/" className="inline-block">
              <p className="font-serif text-2xl sm:text-3xl tracking-[0.12em] font-semibold text-white">
                SHOP HAVEN
              </p>

              <p className="text-[9px] uppercase tracking-[0.4em] text-[#b69a68] mt-1">
                Curated Luxury
              </p>
            </Link>

            <p className="text-sm leading-7 text-[#a9a39a] mt-6">
              Discover timeless fashion and carefully selected pieces from the
              world's most celebrated luxury houses.
            </p>

            <div className="flex items-center gap-3 mt-7">
              <span className="w-8 h-px bg-[#a98a52]" />

              <span className="text-[9px] uppercase tracking-[0.28em] text-[#8f897f]">
                Timeless. Refined. Iconic.
              </span>
            </div>
          </div>

          {/* =========================
              SHOP
          ========================== */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#b69a68]">
              Shop
            </h3>

            <nav className="mt-5 space-y-3">
              <Link
                to="/products"
                className="block text-sm text-[#b4aea5] hover:text-white transition"
              >
                All Products
              </Link>

              <Link
                to="/products?sort=newest"
                className="block text-sm text-[#b4aea5] hover:text-white transition"
              >
                New Arrivals
              </Link>

              <Link
                to="/products"
                className="block text-sm text-[#b4aea5] hover:text-white transition"
              >
                Featured
              </Link>

              <a
                href="/#brands"
                className="block text-sm text-[#b4aea5] hover:text-white transition"
              >
                Brands
              </a>
            </nav>
          </div>

          {/* =========================
              CUSTOMER CARE
          ========================== */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#b69a68]">
              Customer Care
            </h3>

            <nav className="mt-5 space-y-3">
              <button
                type="button"
                className="block text-sm text-[#b4aea5] hover:text-white transition"
              >
                Contact Us
              </button>

              <button
                type="button"
                className="block text-sm text-[#b4aea5] hover:text-white transition"
              >
                Shipping
              </button>

              <button
                type="button"
                className="block text-sm text-[#b4aea5] hover:text-white transition"
              >
                Returns
              </button>

              <button
                type="button"
                className="block text-sm text-[#b4aea5] hover:text-white transition"
              >
                FAQ
              </button>
            </nav>
          </div>

          {/* =========================
              NEWSLETTER
          ========================== */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#b69a68]">
              Stay Updated
            </h3>

            <p className="text-sm leading-6 text-[#a9a39a] mt-5">
              Receive updates about new collections, exclusive pieces and
              special offers.
            </p>

            <form onSubmit={handleSubscribe} className="mt-5">
              <div className="flex items-center rounded-xl overflow-hidden border border-[#393633] bg-[#211f1c]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 min-w-0 bg-transparent px-4 py-3 text-sm text-white placeholder:text-[#777169] outline-none"
                />

                <button
                  type="submit"
                  className="w-12 h-12 shrink-0 bg-[#2b2925] text-[#d0b37d] hover:bg-[#36322c] transition"
                  aria-label="Subscribe"
                >
                  →
                </button>
              </div>
            </form>

            {message && (
              <p className="text-xs text-[#b9a071] mt-3">{message}</p>
            )}
          </div>
        </div>

        {/* =========================
            DIVIDER
        ========================== */}
        <div className="border-t border-[#302e2b] mt-14 sm:mt-16 pt-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-[#777169]">
              © {new Date().getFullYear()} Shop Haven. All rights reserved.
            </p>

            <div className="flex items-center gap-5 text-xs text-[#777169]">
              <span>Privacy</span>

              <span>Terms</span>

              <span>Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
