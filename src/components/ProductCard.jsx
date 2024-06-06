import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartLocal,
  updateCartState,
  addProductToCart,
} from "@/redux/cart/cartSlice";
import { toast } from "sonner";
import { useState } from "react";
import Loader from "./Loader";

const ProductCard = ({ img, description, price, id, name }) => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const user = useSelector((state) => state.user.user);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const handleAddToCart = () => {
    if (user) {
      setIsCartLoading(true);
      console.log(id);
      dispatch(addProductToCart({ productID: id, quantity: 1 }))
        .unwrap()
        .then((data) => {
          setIsCartLoading(false);
        })
        .catch((error) => {
          toast.error("Failed to add product to cart.");
          console.error("Failed to add product to cart:", error);
          setIsCartLoading(false);
        });
    } else {
      dispatch(addToCartLocal({ img, price, id, name }));
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center">
        <Link to={`/products/${id}`}>
          <img
            src={img}
            alt="Product Image"
            className="w-24 h-24 object-cover rounded-lg"
          />
          <h2>{name}</h2>
          <div className="flex-1 ml-4">
            <p className="text-lg font-semibold">{description}</p>
            <p className="text-gray-500">${price}</p>
          </div>
        </Link>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => handleAddToCart()}
      >
        {isCartLoading ? <Loader /> : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
