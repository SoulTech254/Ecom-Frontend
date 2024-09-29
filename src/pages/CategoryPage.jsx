import { useGetCategoryProducts, useGetSubcategories } from "@/api/HomeApi";
import CircleLink from "@/components/CircleLink";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/skeletons/SkeletonCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const branch = useSelector((state) => state.branch.selectedBranch.id);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    products,
    metadata,
    isProductsLoading,
    error: productsError,
  } = useGetCategoryProducts(
    categoryId,
    branch,
    sortBy,
    sortOrder,
    currentPage,
    searchParams.get("searchQuery") || ""
  );

  const { subcategories, isSubcategoriesLoading } =
    useGetSubcategories(categoryId);

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

  const handleSortChange = (e) => {
    const [sortField, order] = e.target.value.split(",");
    setSortBy(sortField);
    setSortOrder(Number(order));
    setSearchParams({ sortBy: sortField, sortOrder: order, page: 1 });
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!isLoadingMore) return;
    setIsLoadingMore(false);
  }, [currentPage]);

  return (
    <div className="mt-4">
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
          <div>
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

      {isProductsLoading ? (
        <div className="flex flex-wrap justify-around mb-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : productsError ? (
        <div className="text-red-500 text-center mt-4">
          No categories found. Try another criteria.
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

            <div>
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

          {isLoadingMore && (
            <div className="flex flex-wrap justify-around mb-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
