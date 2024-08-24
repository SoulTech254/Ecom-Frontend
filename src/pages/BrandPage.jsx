import PaginationSelector from "@/components/PaginationSelector";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProducts } from "@/api/ProductApi";

const BrandPage = () => {
  const { brand } = useParams(); // Get brand from the route parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const branch = useSelector((state) => state.branch.selectedBranch.id);
  console.log(branch);
  console.log(brand);

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
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-gray-600">
        <span className="uppercase">{brand}</span> products
      </h2>

      <div className="flex justify-between items-center mb-4 mt-4">
        <h2 className="text-2xl font-semibold text-gray-600">
          <p className="text-gray-600 text-sm">
            {metadata.totalDocuments} product
            {metadata.totalDocuments === 1 ? "" : "s"} found
          </p>
        </h2>
      </div>

      <div className="flex flex-wrap mb-4">
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

export default BrandPage;
