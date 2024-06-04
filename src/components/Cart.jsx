import { ShoppingCart } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  // Select the totalQuantity from the cart state in the Redux store
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <div className="relative">
      <Link to="/cart" className="flex items-center">
        <ShoppingCart className="mr-1" />
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {totalQuantity}
        </span>
      </Link>
    </div>
  );
};

export default Cart;
