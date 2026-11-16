import React from "react";

const ProductItemSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-square sm:aspect-[4/5] bg-gray-200 rounded-sm" />

      {/* Title Skeleton */}
      <div className="pt-3 pb-1 space-y-1.5">
        <div className="h-3.5 bg-gray-200 rounded w-4/5" />
      </div>

      {/* Price Skeleton */}
      <div className="h-3.5 bg-gray-200 rounded w-1/3 mt-1" />
    </div>
  );
};

export default ProductItemSkeleton;
