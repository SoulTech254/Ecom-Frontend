import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProducts } from "@/api/ProductApi";
import SkeletonCard from "@/components/skeletons/SkeletonCard";

const BrandPage = () => {
  const { brand } = useParams(); // Get brand from the route parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const branch = useSelector((state) => state.branch.selectedBranch.id);

  // Initialize state for current page and loading states
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { products, metadata, isProductsLoading } = useGetProducts(
    branch,
    brand
  );

  useEffect(() => {
    if (metadata.totalDocuments > products.length) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [metadata.totalDocuments, products.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.offsetHeight - 200; // Adjust threshold

      if (scrollPosition >= bottomPosition && hasMore && !isLoadingMore) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoadingMore]);

  const loadMoreProducts = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isLoadingMore) return;
    setIsLoadingMore(false);
  }, [currentPage]);

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

      <div className="flex flex-wrap justify-around mb-4 gap-2">
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

      {isLoadingMore && (
        <div className="flex flex-wrap justify-around mb-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandPage;
