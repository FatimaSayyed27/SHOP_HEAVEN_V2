import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBrands } from "../services/productService";

function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL;

  // =====================================================
  // FETCH BRANDS
  // =====================================================

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getBrands();

        setBrands(data || []);
      } catch (err) {
        console.error(
          "Brands page error:",
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

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#1c1a18]">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden border-b border-[#e8e1d7] bg-[#f4f1eb]">

        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(
                45deg,
                transparent 49%,
                #d6cfc4 50%,
                transparent 51%
              ),
              linear-gradient(
                -45deg,
                transparent 49%,
                #d6cfc4 50%,
                transparent 51%
              )
            `,
            backgroundSize:
              "115px 115px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:py-28 text-center">

          <p className="text-[9px] uppercase tracking-[0.45em] text-[#9c8d76]">
            The House Directory
          </p>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl mt-4 text-[#1c1a18] leading-none">
            Our Brands
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#746e65] mt-6 leading-7">
            Explore the world's most celebrated
            fashion houses and discover their
            curated collections of timeless
            design, craftsmanship and modern
            luxury.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">

            <span className="w-10 h-px bg-[#b8995b]" />

            <span className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
              Curated Houses
            </span>

            <span className="w-10 h-px bg-[#b8995b]" />

          </div>

        </div>
      </section>

      {/* =================================================
          BRANDS DIRECTORY
      ================================================= */}

      <section className="border-y border-[#e8e1d7] bg-[#f8f6f2]">

        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20">

          {/* Section Heading */}
          <div className="text-center">

            <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
              The Houses
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl mt-3">
              Discover the Collection
            </h2>

            <p className="text-sm text-[#756e65] mt-3">
              Explore every house curated by Shop Haven.
            </p>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mt-10">

              {Array.from({
                length: 10,
              }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-white border border-[#ebe5dc] p-6 sm:p-7 rounded-2xl"
                >

                  <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-[#eeeae3]" />

                  <div className="w-20 h-2.5 bg-[#eeeae3] rounded mx-auto mt-5" />

                </div>
              ))}

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div className="text-center py-16">

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                House Directory
              </p>

              <p className="text-sm text-[#a45d55] mt-3">
                {error}
              </p>

            </div>
          )}

          {/* =================================================
              ALL BRANDS
          ================================================= */}

          {!loading &&
            !error &&
            brands.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mt-10">

                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/brands/${brand.slug}`}
                    className="group bg-white border border-[#e7e0d7] rounded-2xl p-5 sm:p-6 hover:-translate-y-1 hover:border-[#cfc4b7] hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)] transition duration-500"
                  >

                    {/* Logo */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full border border-[#e7e0d6] flex items-center justify-center overflow-hidden bg-white group-hover:border-[#c8bba9] transition duration-500">

                   {brand.logo ? (
  <img
    src={getImageUrl(brand.logo)}
    alt={`${brand.name} logo`}
    className="w-full h-full object-contain p-4 sm:p-5 transition-transform duration-700 group-hover:scale-105"
  />
) : (
                        <span className="font-serif text-3xl text-[#1c1a18]">
                          {brand.name
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      )}

                    </div>

                    {/* Brand Name */}
                    <p className="mt-5 text-center text-[9px] uppercase tracking-[0.22em] text-[#756e65] group-hover:text-black transition">
                      {brand.name}
                    </p>

                    {/* Hover CTA */}
                    <div className="flex justify-center mt-3 opacity-0 group-hover:opacity-100 transition duration-300">

                      <span className="text-[8px] uppercase tracking-[0.16em] text-[#9a8666]">
                        Explore →
                      </span>

                    </div>

                  </Link>
                ))}

              </div>
            )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            !error &&
            brands.length === 0 && (
              <div className="text-center py-16">

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                  House Directory
                </p>

                <h3 className="font-serif text-2xl mt-3">
                  No Brands Found
                </h3>

                <p className="text-sm text-[#756e65] mt-2">
                  There are no brands available right now.
                </p>

              </div>
            )}

        </div>
      </section>

      {/* =================================================
          LUXURY PHILOSOPHY
      ================================================= */}

      <section className="bg-[#fbfaf7]">

        <div className="max-w-5xl mx-auto px-6 py-14 sm:py-16 text-center">

          <div className="flex items-center justify-center gap-3">

            <span className="w-10 h-px bg-[#b8995b]" />

            <p className="text-[9px] uppercase tracking-[0.38em] text-[#9a8666]">
              Our Philosophy
            </p>

            <span className="w-10 h-px bg-[#b8995b]" />

          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl mt-6 leading-tight">
            Crafted for those

            <span className="block italic font-light">
              who appreciate the extraordinary.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base leading-7 text-[#746e65] mt-6">
            From iconic fashion houses to
            exceptional craftsmanship, every
            name in our collection represents a
            distinctive point of view and a lasting
            legacy of design.
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-9">

            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8e8377]">
              Heritage
            </span>

            <span className="w-1 h-1 rounded-full bg-[#b8995b] self-center" />

            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8e8377]">
              Craftsmanship
            </span>

            <span className="w-1 h-1 rounded-full bg-[#b8995b] self-center" />

            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8e8377]">
              Iconic Style
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default BrandsPage;

