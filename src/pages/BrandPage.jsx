import PaginationSelector from "@/components/PaginationSelector";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProducts } from "@/api/ProductApi";
import SkeletonCard from "@/components/skeletons/SkeletonCard";

const BrandPage = () => {
  const { brand } = useParams(); // Get brand from the route parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const branch = useSelector((state) => state.branch.selectedBranch.id);

  // Initialize state for current page
  const [currentPage, setCurrentPage] = useState(1);

  const { products, metadata, isProductsLoading } = useGetProducts(
    branch,
    brand
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
  };

  if (isProductsLoading) {
    return (
      <div className="flex flex-col min-h-screen mt-4">
        {/* Skeleton for the brand heading */}
        <div className="mb-4">
          <div className="w-1/2 bg-gray-200 h-8 rounded-md">
            <div className="animate-pulse h-full w-full"></div>
          </div>
        </div>

        {/* Skeleton for the product count */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/3 bg-gray-200 h-6 rounded-md">
            <div className="animate-pulse h-full w-full"></div>
          </div>
        </div>

        {/* Skeleton for product cards */}
        <div className="flex flex-wrap mb-4 gap-2">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>

        {/* Skeleton for the pagination */}
        <div className="mt-auto mb-4 flex justify-center">
          <div className="w-1/3 bg-gray-200 h-8 rounded-md">
            <div className="animate-pulse h-full w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen mt-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-4">
        <span className="capitalize">{brand}</span> Products
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-600">
          <p className="text-sm md:text-base text-gray-600">
            {metadata.totalDocuments} product
            {metadata.totalDocuments === 1 ? "" : "s"} found
          </p>
        </h2>
      </div>

      <div className="flex flex-wrap mb-4 gap-2">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            discountPrice={product.discountPrice}
            price={product.price}
            brand={product.brand}
            img={product.images[0]}
            name={product.productName}
            id={product._id}
            stockLevel={product.stockLevel}
          />
        ))}
      </div>

      <div className="mt-auto">
        <PaginationSelector
          page={currentPage}
          pages={metadata.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BrandPage;
