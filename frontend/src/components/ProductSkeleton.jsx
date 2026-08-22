function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] rounded-2xl bg-gray-200" />

      <div className="mt-4">
        <div className="h-3 w-20 bg-gray-200 rounded" />

        <div className="h-5 w-3/4 bg-gray-200 rounded mt-2" />

        <div className="h-5 w-24 bg-gray-200 rounded mt-3" />
      </div>
    </div>
  );
}

export default ProductSkeleton;
