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
        <ShoppingCart size={40} color="#b12e26" strokeWidth={1.75} />
        <span className="absolute bottom-5 right-0 left-6 bg-[#194A34] text-white rounded-full w-8 h-8 flex items-center justify-center ">
          {totalQuantity}
        </span>
      </Link>
    </div>
  );
};

export default Cart;
