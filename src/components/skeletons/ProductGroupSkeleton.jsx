import SkeletonCard from "@/components/skeletons/SkeletonCard";
import React from "react";

const ProductGroupSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default ProductGroupSkeleton;
