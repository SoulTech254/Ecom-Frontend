import { useSearchProducts } from "@/api/HomeApi";
import PaginationSelector from "@/components/PaginationSelector";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const branch = useSelector((state) => state.branch.selectedBranch.id);

  // Initialize state for sortBy, sortOrder, and current page
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const { products, metadata, isProductsLoading } = useSearchProducts(
    searchTerm,
    branch,
    sortBy,
    sortOrder,
    currentPage // Pass currentPage to the hook
  );

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
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ searchTerm, sortBy, sortOrder, page });
  };

  if (isProductsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-600">
          Search results for {searchTerm}
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

      <div className="flex flex-wrap gap-2 w-full mb-4">
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
    </div>
  );
};

export default SearchPage;
