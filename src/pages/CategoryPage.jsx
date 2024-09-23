import { useGetCategoryProducts, useGetSubcategories } from "@/api/HomeApi";
import CircleLink from "@/components/CircleLink";
import PaginationSelector from "@/components/PaginationSelector";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/skeletons/SkeletonCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryId } = useParams(); // Get the categoryId from the URL params
  const [searchParams, setSearchParams] = useSearchParams();
  const branch = useSelector((state) => state.branch.selectedBranch.id);

  // Initialize state for sortBy, sortOrder, and current page
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const { products, metadata, isProductsLoading } = useGetCategoryProducts(
    categoryId,
    branch,
    sortBy,
    sortOrder,
    currentPage, // Pass currentPage to the hook
    searchParams.get("searchQuery") || "" // Optional search query within the category
  );
  const { subcategories, isSubcategoriesLoading } =
    useGetSubcategories(categoryId);

  const handleSortChange = (e) => {
    const [sortField, order] = e.target.value.split(",");
    setSortBy(sortField);
    setSortOrder(Number(order));
    setSearchParams({
      sortBy: sortField,
      sortOrder: order,
      page: 1,
    });
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ sortBy, sortOrder, page });
  };

  return (
    <div className="mt-4">
      {/* Render subcategories if they are loaded or display loading skeleton */}
      {isSubcategoriesLoading ? (
        <div className="flex flex-wrap justify-around mb-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <div className="animate-pulse h-full w-full rounded-full bg-gray-300"></div>
            </div>
          ))}
        </div>
      ) : (
        subcategories && (
          <div className="">
            <h1 className="text-lg font-bold mb-4 capitalize">
              Shop {categoryId} By Category
            </h1>
            <div className="flex flex-wrap justify-between">
              {subcategories.map((subcategory) => (
                <CircleLink
                  key={subcategory._id}
                  src={subcategory.imageUrl}
                  title={subcategory.name}
                  link={`/category/${subcategory._id}`}
                />
              ))}
            </div>
          </div>
        )
      )}

      {/* Display product list or skeleton based on product loading state */}
      {isProductsLoading ? (
        <div>
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
      ) : (
        <>
          <div className="flex justify-between items-center mb-4 mt-4">
            <h2 className="text-2xl font-semibold text-gray-600">
              <p className="text-gray-600 text-sm">
                {metadata.totalDocuments} product
                {metadata.totalDocuments === 1 ? "" : "s"} found
              </p>
            </h2>

            <div className="">
              <label htmlFor="sort" className="mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                value={`${sortBy},${sortOrder}`}
                onChange={handleSortChange}
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
              >
                <option value="createdAt,-1">Relevance</option>
                <option value="discountPrice,1">Price: Low to High</option>
                <option value="discountPrice,-1">Price: High to Low</option>
              </select>
            </div>
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

          <PaginationSelector
            page={currentPage}
            pages={metadata.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default CategoryPage;
