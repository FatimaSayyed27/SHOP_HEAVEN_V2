import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#1c1a18] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl text-center">
        {/* =================================================
            BRAND
        ================================================= */}

        <p className="text-[9px] uppercase tracking-[0.45em] text-[#9a8666]">
          Shop Haven
        </p>

        {/* =================================================
            404
        ================================================= */}

        <div className="mt-5">
          <h1 className="font-serif text-[7rem] sm:text-[9rem] leading-none text-[#1c1a18]">
            404
          </h1>

          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="w-10 h-px bg-[#b8995b]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#9a8666]">
              The House Directory
            </span>

            <span className="w-10 h-px bg-[#b8995b]" />
          </div>
        </div>

        {/* =================================================
            MESSAGE
        ================================================= */}

        <h2 className="font-serif text-3xl sm:text-4xl mt-7">
          This page is no longer here.
        </h2>

        <p className="max-w-lg mx-auto text-sm sm:text-base leading-7 text-[#756e65] mt-4">
          The page you are looking for may have been moved, removed, or simply
          does not exist. Let us guide you back to the collection.
        </p>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            to="/"
            className="w-full sm:w-auto bg-[#1b1917] text-white px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
          >
            Return Home
          </Link>

          <Link
            to="/products"
            className="w-full sm:w-auto border border-[#d5cdc2] text-[#4f4942] px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] hover:border-black hover:text-black transition"
          >
            Browse Collection
          </Link>
        </div>

        {/* =================================================
            DECORATIVE LINE
        ================================================= */}

        <div className="flex justify-center mt-12">
          <div className="w-20 h-px bg-[#ddd5ca]" />
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
