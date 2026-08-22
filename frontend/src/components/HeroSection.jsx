import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getFeaturedProducts } from "../services/productService";

function HeroSection() {
  const [heroProduct, setHeroProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    const fetchHeroProduct = async () => {
      try {
        const products = await getFeaturedProducts();

        if (products.length > 0) {
          setHeroProduct(products[0]);
        }
      } catch (error) {
        console.error(
          "Hero product error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHeroProduct();
  }, []);

  return (
    <section className="bg-[#f4f1eb]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-24">

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="max-w-xl">

            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#b8995b]" />

              <p className="text-[10px] uppercase tracking-[0.4em] text-[#8c7b61]">
                The House of Shop Haven
              </p>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-[#171717]">
              Discover
              <span className="block italic font-light mt-2">
                Signature Style
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm sm:text-base leading-7 text-[#6f6a61]">
              A refined collection of iconic fashion,
              elevated essentials and timeless pieces
              from the world's most celebrated brands.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">

              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-[#171717] text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-black transition"
              >
                Shop Collection
              </Link>

              <a
                href="#brands"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-[#b9b1a4] text-[#2b2926] text-sm font-medium hover:bg-white transition"
              >
                Explore Brands
              </a>

            </div>

            <div className="flex items-center gap-8 mt-10 text-[10px] uppercase tracking-[0.22em] text-[#8b8376]">
              <span>Curated Luxury</span>
              <span>Authentic Brands</span>
              <span>Timeless Pieces</span>
            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="relative aspect-[4/4.2] rounded-[28px] overflow-hidden bg-[#ddd8d0]">

              {loading ? (
                <div className="w-full h-full animate-pulse bg-[#ddd8d0]" />
              ) : heroProduct?.image ? (
                <img
                  src={`${BASEURL}${heroProduct.image}`}
                  alt={
                    heroProduct.name ||
                    "Shop Haven Collection"
                  }
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#8f897f]">
                  No collection image
                </div>
              )}

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

            </div>

            {heroProduct && (
              <div className="absolute left-5 bottom-5 sm:left-7 sm:bottom-7 bg-[#f9f7f2]/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg">

                <p className="text-[9px] uppercase tracking-[0.28em] text-[#98876b]">
                  Featured Piece
                </p>

                <p className="text-sm font-medium text-[#171717] mt-1">
                  {heroProduct.name}
                </p>

                <p className="text-xs text-[#6f6a61] mt-1">
                  ₹
                  {Number(
                    heroProduct.price
                  ).toLocaleString("en-IN")}
                </p>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;