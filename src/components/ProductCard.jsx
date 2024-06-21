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
import { Plus } from 'lucide-react';

const ProductCard = ({ img, description, price, id, name }) => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const user = useSelector((state) => state.user.user);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const handleAddToCart = () => {
    if (user) {
      setIsCartLoading(true);
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
   
    <div className="bg-white rounded-xl m-1  overflow-hidden flex flex-col justify-between w-52 h-fit pb-6  ">
    <div className="flex-1 flex flex-col">
      <Link to={`/products/${id}`} className="flex flex-col justify-between">
        <div className="h-[150px]">
          <img
            src={img}
            alt="Product Image"
            className="w-full h-full object-cover"
          />
        </div>
          <h2 className="font-medium p-2 text-2xl">${price}</h2>
        <div className="flex-1 p-2">
          { /*<p className="text-lg font-semibold">{description}</p> */}
        <p className="text-black text-md ">{name}</p>
        </div>
      </Link>
    </div>
    <div className="flex flex-row justify-center items-center mt-2">
      <button
        className="bg-primary text-white px-4 py-2 rounded-3xl hover:bg-primary/90 active:scale-95 flex items-center"
        onClick={() => handleAddToCart()}
      >
        {isCartLoading ? <Loader /> : (
          <div className="flex items-center justify-center">
            <Plus className="mr-1 h-5" />
            Add to Cart
          </div>
        )}
      </button>
    </div>
  </div>
  
   
  );
};

export default ProductCard;
