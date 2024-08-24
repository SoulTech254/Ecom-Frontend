import React, { useState, useEffect } from "react";
import {
  useGetAProduct,
  useGetBestSellers,
  useGetProducts,
} from "@/api/ProductApi";
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
import { addProductToCart } from "@/redux/cart/cartSlice";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { chunkArray } from "@/utils/utils";
import ProductGroup from "@/components/ProductGroup";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedBranch } = useSelector((state) => state.branch);
  const { products, metadata, isProductsLoading } = useGetProducts(
    selectedBranch.id
  );
  const { product, isProductLoading } = useGetAProduct(id, selectedBranch.id);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const cart = useSelector((state) => state.cart);

  if (isProductLoading) {
    return <div>Loading...</div>;
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

  const options = Array.from({ length: SKU }, (_, i) => i + 1);
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
          await dispatch(
            addProductToCart({
              productID: id,
              quantity: quantity,
              method: "setQuantity",
            })
          ).unwrap();
        } catch (error) {
          console.error("Failed to update product in cart:", error);
        } finally {
          setIsAddingToCart(false);
        }
      } else {
        console.error(
          "Cannot add more than available stock or have negative quantity."
        );
      }
    } else {
      console.error("Product is out of stock.");
    }
  };

  return (
    <div className="">
      <div className="">
        {/* Breadcrumbs */}
        <div className="py-4">
          {breadcrumbs.length > 0 && (
            <nav aria-label="breadcrumb">
              <ol className="flex space-x-2 text-sm text-gray-500">
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

        <div className="flex w-fit gap-16">
          <div className="w-[50%]">
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
                      className="w-[400px] h-fit object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && <CarouselPrevious />}
              {images.length > 1 && <CarouselNext />}
            </Carousel>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl capitalize font-semibold">{productName}</h2>
            <Link to={`/brand/${brand}`} className="capitalize text-primary">
              {brand}
            </Link>
            <p className="text-">Size: {size}</p>

            <QuantityDropdown
              stockLevel={stockLevel}
              price={discountPrice}
              onQuantityChange={handleQuantityChange}
              initialQuantity={currentQuantityInCart}
            />

            <div className="flex gap-10 mt-4">
              <button
                type="button"
                className={`flex text-white items-center justify-center rounded-3xl py-2 px-4 ${
                  isAddingToCart
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary"
                }`}
                onClick={() => handleAddToCart(selectedQuantity)}
                disabled={isAddingToCart}
              >
                Add To Cart
              </button>
              <button
                type="button"
                className={`flex text-white items-center justify-center rounded-3xl py-2 px-4 ${
                  isAddingToCart
                    ? "bg-gray-400 cursor-default"
                    : "bg-primary text-white"
                }`}
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

          {description && <p className="mt-4">{description}</p>}
        </div>

        {/* Best Sellers Carousel */}
        <div className="mt-8 h-fit ">
          <h2 className="text-xl mb-4">Best Sellers</h2>
          <ProductGroup products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
