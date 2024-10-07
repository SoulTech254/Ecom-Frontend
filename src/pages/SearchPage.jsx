import { useSearchProducts } from "@/api/HomeApi";
import PaginationSelector from "@/components/PaginationSelector";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/skeletons/SkeletonCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  console.log("SearchPage rendered");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const branch = useSelector((state) => state.branch.selectedBranch.id);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [products, setProducts] = useState([]);

  const {
    products: fetchedProducts,
    metadata,
    isProductsLoading,
    error: productsError,
  } = useSearchProducts(searchTerm, branch, sortBy, sortOrder, currentPage);

  // Reset products and current page when searchTerm changes
  useEffect(() => {
    setCurrentPage(1);
    setProducts([]);
    console.log("Search term changed. Resetting products and page.");
  }, [searchTerm]);

  // Update products when fetchedProducts changes
  useEffect(() => {
    if (fetchedProducts) {
      setProducts((prev) => [...prev, ...fetchedProducts]);
      setIsLoadingMore(false); // Reset loading state after fetching products
    }
    console.log("Fetched products:", fetchedProducts);
  }, [fetchedProducts]);

  // Update hasMore state
  useEffect(() => {
    if (metadata?.totalDocuments !== undefined) {
      setHasMore(metadata.totalDocuments > products.length);
      console.log("Total documents:", metadata.totalDocuments);
      console.log("Products length:", products.length);
      console.log("hasMore:", hasMore);
    }
  }, [metadata?.totalDocuments, products.length]);

  // Handle sort change
  const handleSortChange = (e) => {
    const [sortField, order] = e.target.value.split(",");
    setSortBy(sortField);
    setSortOrder(Number(order));
    setSearchParams({
      searchTerm,
      sortBy: sortField,
      sortOrder: order,
      page: 1,
    });
    setCurrentPage(1); // Reset to the first page
    setProducts([]); // Reset products on sort change
    console.log("Sort changed. Resetting products and page.");
  };

  // Handle scroll for loading more products
  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight - 800; // Adjust threshold

    if (scrollPosition >= bottomPosition && hasMore && !isLoadingMore) {
      loadMoreProducts();
    }
  };

  const loadMoreProducts = () => {
    if (isLoadingMore || !hasMore || metadata?.totalPages === currentPage)
      return;
    setIsLoadingMore(true);
    setCurrentPage((prev) => prev + 1);
    console.log("Loading more products...");
  };

  // Listen to scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoadingMore, currentPage]); // Ensure currentPage is a dependency

  // Loading state
  if (isProductsLoading) {
    return (
      <div>
        <div className="flex flex-wrap gap-2 w-full mb-4">
          {[...Array(10)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
        <PaginationSelector page={1} pages={1} onPageChange={() => {}} />
      </div>
    );
  }

  return (
    <div>
      {productsError ? (
        <div className="text-red-500 text-center mt-4">
          No products found. Try another search term.
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-600">
              Search results for "{searchTerm}"
              <p className="text-gray-600 text-sm">
                {metadata?.totalDocuments} product
                {metadata?.totalDocuments === 1 ? "" : "s"} found
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
          <div className="flex flex-wrap justify-start gap-2 w-full mb-4">
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
            <div className="flex flex-wrap gap-2 w-full mb-4">
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

export default SearchPage;
