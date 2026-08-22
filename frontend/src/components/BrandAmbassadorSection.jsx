import { useEffect, useRef, useState } from "react";

function BrandAmbassadorSection({ brand }) {
  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL;

  const scrollRef = useRef(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  // =====================================================
  // 4 AMBASSADOR / CAMPAIGN IMAGES
  // =====================================================

  const cards = [
    brand?.ambassador_image_1,
    brand?.ambassador_image_2,
    brand?.ambassador_image_3,
    brand?.ambassador_image_4,
  ]
    .filter(Boolean)
    .map((image) => ({
      image: `${BASEURL}${image}`,
    }));

  // =====================================================
  // UPDATE PAGE NUMBER ON SCROLL
  // Desktop = 2 cards per page
  // Mobile = 1 card per page
  // =====================================================

  useEffect(() => {
    const container =
      scrollRef.current;

    if (!container) {
      return;
    }

    const handleScroll = () => {
      const firstCard =
        container.querySelector(
          "[data-ambassador-card]"
        );

      if (!firstCard) {
        return;
      }

      const cardWidth =
        firstCard.getBoundingClientRect()
          .width;

      const styles =
        window.getComputedStyle(
          container
        );

      const gap =
        parseFloat(styles.columnGap) || 20;

      const visibleItems =
        window.innerWidth >= 1024
          ? 2
          : 1;

      const pageWidth =
        (cardWidth + gap) *
        visibleItems;

      if (pageWidth <= 0) {
        return;
      }

      const calculatedPage =
        Math.round(
          container.scrollLeft /
            pageWidth
        ) + 1;

      const totalPages = Math.max(
        1,
        Math.ceil(
          cards.length /
            visibleItems
        )
      );

      setCurrentPage(
        Math.min(
          Math.max(
            calculatedPage,
            1
          ),
          totalPages
        )
      );
    };

    container.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {
      container.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };
  }, [cards.length]);

  // =====================================================
  // TOTAL PAGES
  // =====================================================

  const getTotalPages = () => {
    if (
      typeof window === "undefined"
    ) {
      return Math.max(
        1,
        Math.ceil(cards.length / 1)
      );
    }

    const visibleItems =
      window.innerWidth >= 1024
        ? 2
        : 1;

    return Math.max(
      1,
      Math.ceil(
        cards.length /
          visibleItems
      )
    );
  };

  const totalPages =
    getTotalPages();

  // =====================================================
  // NEXT
  // =====================================================

  const handleNext = () => {
    const container =
      scrollRef.current;

    if (!container) {
      return;
    }

    const firstCard =
      container.querySelector(
        "[data-ambassador-card]"
      );

    if (!firstCard) {
      return;
    }

    const cardWidth =
      firstCard.getBoundingClientRect()
        .width;

    const styles =
      window.getComputedStyle(
        container
      );

    const gap =
      parseFloat(styles.columnGap) || 20;

    const visibleItems =
      window.innerWidth >= 1024
        ? 2
        : 1;

    const moveBy =
      (cardWidth + gap) *
      visibleItems;

    container.scrollBy({
      left: moveBy,
      behavior: "smooth",
    });
  };

  // =====================================================
  // PREVIOUS
  // =====================================================

  const handlePrevious = () => {
    const container =
      scrollRef.current;

    if (!container) {
      return;
    }

    const firstCard =
      container.querySelector(
        "[data-ambassador-card]"
      );

    if (!firstCard) {
      return;
    }

    const cardWidth =
      firstCard.getBoundingClientRect()
        .width;

    const styles =
      window.getComputedStyle(
        container
      );

    const gap =
      parseFloat(styles.columnGap) || 20;

    const visibleItems =
      window.innerWidth >= 1024
        ? 2
        : 1;

    const moveBy =
      (cardWidth + gap) *
      visibleItems;

    container.scrollBy({
      left: -moveBy,
      behavior: "smooth",
    });
  };

  // =====================================================
  // EMPTY BRAND
  // =====================================================

  if (!brand) {
    return null;
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="relative overflow-hidden bg-[#f3f1ed] border-b border-[#e5dfd7]">

      {/* =================================================
          DIAMOND PATTERN
      ================================================= */}

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(
              45deg,
              transparent 49%,
              #d2ccc3 50%,
              transparent 51%
            ),
            linear-gradient(
              -45deg,
              transparent 49%,
              #d2ccc3 50%,
              transparent 51%
            )
          `,
          backgroundSize:
            "110px 110px",
        }}
      />

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-[#f3f1ed]/55 pointer-events-none" />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="relative z-10 max-w-[1500px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.8fr] min-h-[650px]">

          {/* =================================================
              LEFT — AMBASSADOR INFORMATION
          ================================================= */}

          <div className="flex items-center justify-center px-6 sm:px-10 lg:px-16 py-14 sm:py-16 lg:py-16">

            <div className="w-full max-w-md text-center">

              {/* Small heading */}
              <div className="flex items-center justify-center gap-3">

                <span className="w-8 h-px bg-[#b5955d]" />

                <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8464]">
                  Ambassador
                </p>

                <span className="w-8 h-px bg-[#b5955d]" />

              </div>

              {/* Brand logo */}
              {/* {brand.logo && (
                <div className="mx-auto mt-7 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border border-[#ded6ca] flex items-center justify-center overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.04)]">

                  <img
                    src={`${BASEURL}${brand.logo}`}
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain p-4"
                  />

                </div>
              )} */}

              {/* Brand Name */}
              {/* <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-none mt-6 text-[#272522]">
                {brand.name}
              </h2> */}

              {/* Ambassador Name */}
              <h3 className="font-serif text-2xl sm:text-3xl italic mt-7 text-[#3a3733]">
                {brand.ambassador_name ||
                  "Meet the Ambassador"}
              </h3>

              {/* Ambassador Description */}
              <p className="text-sm sm:text-base leading-7 text-[#68635c] mt-5 max-w-sm mx-auto">
                {brand.ambassador_description ||
                  `Discover the ambassador and their distinctive connection with ${brand.name}. Explore the campaigns and signature moments that bring the house to life.`}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-center flex-wrap gap-4 mt-8">

                <span className="text-[9px] uppercase tracking-[0.25em] text-[#8b8174]">
                  Brand Ambassador
                </span>

                <span className="w-1 h-1 rounded-full bg-[#b5955d]" />

                <span className="text-[9px] uppercase tracking-[0.25em] text-[#8b8174]">
                  Campaign
                </span>

              </div>

            </div>
          </div>

          {/* =================================================
              RIGHT — IMAGE ONLY SWIPE CAROUSEL
          ================================================= */}

          <div className="relative flex flex-col justify-center py-6 sm:py-8 lg:py-10">

            {cards.length === 0 ? (
              <div className="min-h-[420px] lg:min-h-[560px] flex items-center justify-center px-8 text-center text-sm text-[#847b70]">
                Add four ambassador images
                from the admin panel.
              </div>
            ) : (
              <>
                {/* =================================================
                    SWIPE AREA
                ================================================= */}

                <div
                  ref={scrollRef}
                  className="
                    brand-ambassador-scroll
                    flex
                    gap-4
                    lg:gap-5
                    overflow-x-auto
                    overflow-y-hidden
                    w-full
                    px-4
                    sm:px-6
                    lg:px-8
                    pb-2
                    snap-x
                    snap-mandatory
                    scroll-smooth
                    touch-pan-x
                    overscroll-x-contain
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                  "
                  style={{
                    WebkitOverflowScrolling:
                      "touch",
                  }}
                >

                  {cards.map(
                    (card, index) => (
                      <div
                        key={index}
                        data-ambassador-card
                        className="
                          shrink-0
                          snap-start
                          overflow-hidden
                          bg-[#ded9d1]

                          /* MOBILE */
                          w-[78vw]
                          h-[420px]

                          /* SMALL */
                          sm:w-[46vw]
                          sm:h-[500px]

                          /* TABLET */
                          md:w-[40vw]
                          md:h-[560px]

                          /* DESKTOP — SAME FEEL */
                          lg:w-[30vw]
                          lg:h-[650px]

                          /* LARGE DESKTOP */
                          xl:w-[29%]
                          xl:h-[650px]

                          max-w-[460px]
                        "
                      >

                        <img
                          src={card.image}
                          alt={`${brand.name} ambassador ${index + 1}`}
                          className="
                            block
                            w-full
                            h-full
                            object-cover
                            select-none
                            pointer-events-none
                          "
                          draggable="false"
                        />

                      </div>
                    )
                  )}

                </div>

                {/* =================================================
                    CONTROLS
                ================================================= */}

                <div className="flex items-center justify-center lg:justify-end gap-4 px-6 sm:px-8 lg:px-10 mt-5 lg:mt-6">

                  <button
                    type="button"
                    onClick={
                      handlePrevious
                    }
                    disabled={
                      currentPage ===
                      1
                    }
                    className="w-9 h-9 rounded-full border border-[#c3beb6] bg-[#f3f1ed]/90 flex items-center justify-center text-[#5e5953] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
                    aria-label="Previous ambassador image"
                  >
                    ←
                  </button>

                  <span className="text-[10px] tracking-[0.18em] text-[#6d6760]">
                    {currentPage}/
                    {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={
                      handleNext
                    }
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    className="w-9 h-9 rounded-full border border-[#c3beb6] bg-[#f3f1ed]/90 flex items-center justify-center text-[#5e5953] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
                    aria-label="Next ambassador image"
                  >
                    →
                  </button>

                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* =================================================
          HIDE SCROLLBAR
      ================================================= */}

      <style>
        {`
          .brand-ambassador-scroll::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
}

export default BrandAmbassadorSection;

