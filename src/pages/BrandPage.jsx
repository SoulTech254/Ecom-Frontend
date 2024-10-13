import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetProducts } from "@/api/ProductApi"; // Ensure pagination is supported in this hook
import { useGetBranches } from "@/api/AuthApi";
import SkeletonCard from "@/components/skeletons/SkeletonCard";
import Popup from "@/components/Popup"; // Import the Popup component
import StoreSelection from "@/components/StoreSelection"; // Import the StoreSelection component
import { setBranch } from "@/redux/branch/branchSlice";

const BrandPage = () => {
  const { brand } = useParams(); // Get brand from the route parameters
  const branch = useSelector((state) => state.branch?.selectedBranch?.id);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [branches, setBranches] = useState([]);
  const { branches: fetchedBranches, isLoadingBranches } = useGetBranches();

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Control popup visibility

  // Fetch products with pagination
  const { products, metadata, isProductsLoading, isFetching } = useGetProducts(
    branch,
    brand,
    currentPage // Pass the currentPage for pagination
  );

  // Update productList when products are fetched
  useEffect(() => {
    if (products.length) {
      setProductList((prevProducts) => {
        // Filter out duplicates by checking product IDs
        const newProducts = products.filter(
          (newProduct) =>
            !prevProducts.some(
              (prevProduct) => prevProduct._id === newProduct._id
            )
        );
        return [...prevProducts, ...newProducts];
      });
      setIsLoadingMore(false); // Reset loading state after fetching products
    }
  }, [products]);

  // Check if there are more products to load
  useEffect(() => {
    if (metadata?.totalDocuments !== undefined) {
      setHasMore(metadata.totalDocuments > productList.length);
    }
  }, [metadata?.totalDocuments, productList.length]);

  // Handle scroll event for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.offsetHeight - 600; // Adjust threshold

      if (
        scrollPosition >= bottomPosition &&
        hasMore &&
        !isLoadingMore &&
        !isFetching
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoadingMore, isFetching]);

  const loadMoreProducts = () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setCurrentPage((prev) => prev + 1); // Increment page number
  };

  // Handle branch selection
  const handleSelectBranch = (branch) => {
    dispatch(setBranch(branch));
    setIsPopupVisible(false);
  };

  useEffect(() => {
    if (!isLoadingBranches) {
      setBranches(fetchedBranches);
    }
  }, [fetchedBranches, isLoadingBranches]);

  // Show popup if no branch is selected
  useEffect(() => {
    if (!branch) {
      setIsPopupVisible(true);
    }
  }, [branch]);

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  // Loading state for the first page
  if (isProductsLoading && currentPage === 1) {
    return (
      <div className="flex flex-col min-h-screen mt-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-4">
          <span className="capitalize">{brand}</span> Products
        </h2>
        {/* Skeleton loading UI */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 ">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} className="m-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen mt-4">
      {/* Store Selection Popup */}
      <Popup isVisible={isPopupVisible} onClose={closePopup}>
        <StoreSelection
          branches={branches}
          onSelectBranch={handleSelectBranch}
        />
      </Popup>

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-4">
        <span className="capitalize">{brand}</span> Products
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-gray-600">
          <p className="text-sm md:text-base text-gray-600">
            {metadata?.totalDocuments} product
            {metadata?.totalDocuments === 1 ? "" : "s"} found
          </p>
        </h2>
      </div>

      <div className="flex flex-wrap sm:justify-start mb-4 justify-center">
        {productList.map((product) => (
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 ">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} className="m-0" />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandPage;
