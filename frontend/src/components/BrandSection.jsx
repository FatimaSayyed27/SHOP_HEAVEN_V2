
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBrands } from "../services/productService";

function BrandSection() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBrands();

        setBrands(data);
      } catch (err) {
        console.error(
          "Brand section error:",
          err
        );

        setError(
          err.message ||
            "Failed to load brands."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Duplicate brands for seamless infinite loop
  const marqueeBrands = [...brands, ...brands];

  return (
    <>
      {/* Marquee animation */}
      <style>
        {`
          @keyframes shopHavenBrandMarquee {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }

          .shop-haven-brand-track {
            animation: shopHavenBrandMarquee 35s linear infinite;
            width: max-content;
          }

          .shop-haven-brand-track:hover {
            animation-play-state: paused;
          }

          @media (max-width: 768px) {
            .shop-haven-brand-track {
              animation-duration: 28s;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .shop-haven-brand-track {
              animation: none;
            }
          }
        `}
      </style>

      <section
        id="brands"
        className="bg-[#fbfaf7] border-y border-[#ece7df] scroll-mt-24 overflow-hidden"
      >
        <div className="py-16 sm:py-20">

          {/* Heading */}
          <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 text-center">

            <p className="text-[10px] uppercase tracking-[0.4em] text-[#9c8d76]">
              The world of Shop Haven
            </p>

            <div className="flex items-center justify-center gap-5 mt-3">

              <span className="hidden sm:block w-12 h-px bg-[#c3a56b]" />

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1c1a18]">
                Shop by Exclusive Brand
              </h2>

              <span className="hidden sm:block w-12 h-px bg-[#c3a56b]" />

            </div>

            <p className="max-w-xl mx-auto text-sm text-[#7e786f] leading-6 mt-5">
              Explore collections from iconic houses
              known for craftsmanship, heritage and
              timeless design.
            </p>

          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-12 flex justify-center gap-8 px-6">
              {Array.from({
                length: 7,
              }).map((_, index) => (
                <div
                  key={index}
                  className="shrink-0 flex flex-col items-center animate-pulse"
                >
                  <div className="w-28 h-28 rounded-full bg-[#eee9e1]" />

                  <div className="w-20 h-3 bg-[#eee9e1] rounded mt-5" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center text-red-500 mt-10 px-6">
              {error}
            </div>
          )}

          {/* Moving Brands */}
          {!loading &&
            !error &&
            brands.length > 0 && (
              <div className="relative mt-12">

                {/* Left fade */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-r from-[#fbfaf7] to-transparent z-10" />

                {/* Right fade */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-l from-[#fbfaf7] to-transparent z-10" />

                {/* Moving track */}
                <div className="overflow-hidden">

                  <div className="shop-haven-brand-track flex">

                    {marqueeBrands.map(
                      (brand, index) => (
                        <Link
                          key={`${brand.id}-${index}`}
                          to={`/brands/${brand.slug}`}
                          className="group shrink-0 w-[180px] sm:w-[200px] lg:w-[220px] flex flex-col items-center px-4"
                        >

                          {/* Logo */}
                          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-white border border-[#e4ddd3] flex items-center justify-center overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.035)] group-hover:-translate-y-1 group-hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)] transition duration-300">

                        {brand.logo ? (
  <img
    src={getImageUrl(brand.logo)}
    alt={brand.name}
    className="w-full h-full object-contain p-5"
  />
) : (
                              <span className="font-serif text-3xl text-[#24211e]">
                                {brand.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>
                            )}

                          </div>

                          {/* Brand name */}
                          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-[#766f65] text-center whitespace-nowrap">
                            {brand.name}
                          </p>

                        </Link>
                      )
                    )}

                  </div>

                </div>
              </div>
            )}

        </div>
      </section>
    </>
  );
}

export default BrandSection;

