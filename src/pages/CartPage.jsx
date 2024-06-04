import React from "react";
import { useGetCart } from "@/api/ProductApi";
import { useSelector } from "react-redux";

const CartPage = () => {
  const user = useSelector((state) => state.user.user);
  const { cart, isCartLoading } = useGetCart(user.cart);
  console.log(cart);

  return (
    <div className="container mx-auto p-4">
      {isCartLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="text-3xl font-semibold mb-4">Cart</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cart.products.map((item) => (
              <div key={item.product._id} className="border rounded p-4">
                <h2 className="text-xl font-semibold">
                  {item.product.productName}
                </h2>
                <p className="text-gray-600">Price: ${item.product.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <img src={item.product.images[0]} />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p>Total Quantity: {cart.totalQuantity}</p>
            <p>Total Amount: ${cart.totalAmount}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
