function ProductDetailsSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 animate-pulse">
      <div className="grid lg:grid-cols-2 gap-12">

        {/* Image */}
        <div className="aspect-square rounded-3xl bg-gray-200" />

        {/* Details */}
        <div className="pt-2">

          <div className="h-3 w-24 bg-gray-200 rounded" />

          <div className="h-12 w-3/4 bg-gray-200 rounded mt-4" />

          <div className="h-8 w-32 bg-gray-200 rounded mt-5" />

          <div className="h-4 w-24 bg-gray-200 rounded mt-6" />

          <div className="space-y-3 mt-8">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>

          <div className="h-12 w-40 bg-gray-200 rounded-full mt-8" />

          <div className="h-14 w-full bg-gray-200 rounded-full mt-8" />

        </div>
      </div>
    </section>
  );
}

export default ProductDetailsSkeleton;