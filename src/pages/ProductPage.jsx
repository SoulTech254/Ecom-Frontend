import React, { useEffect, useState } from "react";
import { useGetAProduct, useGetProducts } from "@/api/ProductApi";
import { useParams, useNavigate, Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector, useDispatch } from "react-redux";
import ShareButton from "@/components/ShareButton";
import QuantityDropdown from "@/components/QuantityDropdown";
import { addProductToCart, addToCartLocal } from "@/redux/cart/cartSlice";
import { toast } from "sonner";
import SkeletonProductPage from "@/components/skeletons/SkeletonProductPage";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import StoreSelection from "@/components/StoreSelection";
import { useGetBranches } from "@/api/HomeApi";
import { setBranch } from "@/redux/branch/branchSlice";
import ProductGroup from "@/components/ProductGroup";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedBranch } = useSelector((state) => state.branch);
  const { branches: fetchedBranches, isLoadingBranches } = useGetBranches();
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (!isLoadingBranches) {
      setBranches(fetchedBranches);
    }
  }, [fetchedBranches, isLoadingBranches]);

  const handleBranchSelection = (branch) => {
    dispatch(setBranch(branch));
    navigate(`/products/${id}`);
  };

  // Always call hooks
  const { products, isProductsLoading } = useGetProducts(
    selectedBranch ? selectedBranch.id : null
  );
  const { product, isProductLoading } = useGetAProduct(
    id,
    selectedBranch ? selectedBranch.id : null
  );
  const axiosPrivate = useAxiosPrivate();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user); // Add user selector

  // Handle loading states
  if (isLoadingBranches || isProductLoading) {
    return <SkeletonProductPage />;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const {
    category,
    productName,
    brand,
    SKU,
    price,
    description,
    images,
    size,
    discountPrice,
    stockLevel,
  } = product;

  const breadcrumbs = category
    ? [
        { name: "Home", path: "/" },
        ...category.path.map((cat) => ({
          name: cat.name,
          path: `/category/${cat._id}`,
        })),
        { name: productName, path: "#" },
      ]
    : [];

  const productUrl = window.location.href;

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const existingCartItem = cart.products.find(
    (item) => item.product._id === id
  );
  const currentQuantityInCart = existingCartItem
    ? existingCartItem.quantity
    : 0;

  const handleAddToCart = async (quantity) => {
    if (stockLevel > 0) {
      const totalQuantityAfterAdding = currentQuantityInCart + quantity;

      if (
        totalQuantityAfterAdding <= stockLevel &&
        totalQuantityAfterAdding >= 0
      ) {
        setIsAddingToCart(true);

        try {
          if (user) {
            // For logged-in users
            await dispatch(
              addProductToCart({
                productID: id,
                quantity: quantity,
                method: "setQuantity",
                axiosPrivate,
              })
            ).unwrap();
          } else {
            // For non-logged-in users, handle local cart
            dispatch(
              addToCartLocal({
                img: product.images[0],
                price: discountPrice || price,
                id,
                name: productName,
                quantity,
              })
            );
            toast.success("Product added to cart.");
          }
        } catch (error) {
          console.error("Failed to update product in cart:", error);
        } finally {
          setIsAddingToCart(false);
        }
      } else {
        toast.error(
          "Cannot add more than available stock or have negative quantity."
        );
      }
    } else {
      toast.error("Product is out of stock.");
    }
  };

  // If no branch is selected, return StoreSelection component
  if (!selectedBranch) {
    return (
      <div className="flex items-center justify-center w-full p-24 bg-white shadow-md">
        <StoreSelection
          branches={branches}
          onSelectBranch={handleBranchSelection}
        />
      </div>
    );
  }

  return (
    <div className="md:p-8 lg:p-4">
      {/* Breadcrumbs */}
      <div className="py-4">
        {breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap space-x-2 text-sm md:text-base text-gray-500">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index < breadcrumbs.length - 1 ? (
                    <>
                      <a href={crumb.path} className="hover:underline">
                        {crumb.name}
                      </a>
                      <span className="mx-2">/</span>
                    </>
                  ) : (
                    <span className="text-primary">{crumb.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-8 lg:gap-16">
        {/* Image Carousel */}
        <div className="lg:w-[30vw] md:w-[50vw]">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
          >
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image}>
                  <img
                    src={image}
                    alt="Product"
                    className="w-full h-auto object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && <CarouselPrevious />}
            {images.length > 1 && <CarouselNext />}
          </Carousel>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            {productName}
          </h2>
          <Link
            to={`/brand/${brand}`}
            className="capitalize text-sm md:text-base"
          >
            More From <span className="text-primary">{brand}</span>
          </Link>
          <p className="text-sm md:text-base">Size: {size}</p>

          <QuantityDropdown
            stockLevel={stockLevel}
            price={discountPrice}
            onQuantityChange={handleQuantityChange}
            initialQuantity={currentQuantityInCart}
          />

          <div className="flex flex-col md:flex-row lg:w-[50%] gap-4">
            <button
              type="button"
              className={`flex-1 text-white rounded-3xl py-2 px-4 ${
                isAddingToCart ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
              } text-sm md:text-base`}
              onClick={() => handleAddToCart(selectedQuantity)}
              disabled={isAddingToCart}
            >
              Add To Cart
            </button>
            <button
              type="button"
              className={`flex-1 text-white rounded-3xl py-2 px-4 ${
                isAddingToCart ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
              } text-sm md:text-base`}
              onClick={async () => {
                await handleAddToCart(selectedQuantity);
                navigate("/cart");
              }}
              disabled={isAddingToCart}
            >
              Buy Now
            </button>
          </div>
          <div className="mt-4">
            <ShareButton url={productUrl} title={productName} />
          </div>
        </div>
      </div>

      {description && (
        <p className="mt-4 text-gray-700 text-sm md:text-base">{description}</p>
      )}

      {/* Best Sellers Carousel */}
      <div className="mt-8">
        <h2 className="text-lg md:text-xl lg:text-2xl mb-4">Best Sellers</h2>
        <ProductGroup products={products} />
      </div>
    </div>
  );
};

export default ProductPage;
