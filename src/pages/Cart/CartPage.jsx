import React, { useEffect, useState } from "react";
import { useGetCart } from "@/api/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import Counter from "@/components/Counter";
import { toast } from "sonner";
import { addProductToCart, deleteProductFromCart } from "@/redux/cart/cartSlice";
import OrderSummary from "@/components/OrderSummary";
import { Trash2 } from "lucide-react";
import Stepper from "@/components/Stepper";
import { links, steps } from "@/config/cartConfig";
import { useNavigate } from "react-router-dom";
import EmptyCartMessage from "@/components/EmptyCartMessage";

const CartPage = () => {
  const user = useSelector((state) => state.user.user);
  const { cart, isCartLoading } = useGetCart(user.cart);
  const [updatedCart, setUpdatedCart] = useState({
    products: [],
    totalQuantity: 0,
    totalSavings: 0,
    totalAmount: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart) {
      setUpdatedCart(cart);
    }
  }, [cart]);

  const updateStatus = useSelector((state) => state.cart.status);

  const handleMinusClick = (productId) => {
    dispatch(
      addProductToCart({ productID: productId, quantity: -1, method: "update" })
    )
      .unwrap()
      .then((newCart) => {
        setUpdatedCart(newCart);
      })
      .catch((error) => {
        toast.error("Failed to update product in cart.");
      });
  };

  const handlePlusClick = (productId) => {
    dispatch(
      addProductToCart({ productID: productId, quantity: 1, method: "update" })
    )
      .unwrap()
      .then((newCart) => {
        setUpdatedCart(newCart);
      })
      .catch((error) => {
        toast.error("Failed to update product in cart.");
      });
  };

  const handleDeleteProduct = (productID) => {
    dispatch(deleteProductFromCart({ cartId: user.cart, productId: productID }))
      .unwrap()
      .then((newCart) => {
        setUpdatedCart(newCart);
      })
      .catch((error) => {
        toast.error("Failed to delete product from cart.");
      });
  };

  const activeStep = 0;

  return (
    <div className="mt-2">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        to={links}
        heading={"Checkout Process"}
      />
      <div className="mx-auto mt-2 flex w-[100%]">
        {isCartLoading === "loading" ? (
          <div>Loading...</div>
        ) : updatedCart.products.length === 0 ? (
          <EmptyCartMessage />  
        ) : (
          <div className="flex w-[100%] bg-transparent gap-10 align-center">
            <div className="flex-1">
              <table className="w-[100%] border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-white">
                    <th className="py-2 px-4 font-semibold text-left">
                      Product Details
                    </th>
                    <th className="py-2 px-4"></th>
                    <th className="py-2 px-4 font-semibold text-left">
                      Quantity
                    </th>
                    <th className="py-2 px-4 font-semibold text-left">Price</th>
                    <th className="py-2 px-4 font-semibold text-left">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {updatedCart.products.map((item) => (
                    <tr key={item.product._id} className="bg-white">
                      <td className="py-2 px-4">
                        <img
                          className="h-[70px] w-[70px] object-cover"
                          src={item.product.images[0]}
                          alt="product image"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <div className="capitalize">
                          {item.product.productName}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <Counter
                          itemCount={item.quantity}
                          onMinusClick={() => handleMinusClick(item.product._id)}
                          onPlusClick={() => handlePlusClick(item.product._id)}
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        Ksh {item.product.price}
                      </td>
                      <td className="py-2 px-4 border-b flex-col relative">
                        <span>
                          Ksh {(item.quantity * item.product.price).toFixed(2)}
                        </span>
                        <Trash2
                          color="#B12E26"
                          size={16}
                          onClick={() => handleDeleteProduct(item.product._id)}
                          className="cursor-pointer absolute bottom-0 right-0 mb-2 mr-2"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="">
              <OrderSummary
                subtotal={updatedCart.totalAmount}
                savings={updatedCart.totalSavings}
                shippingFee={100}
              />
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/address")}
                  className="bg-[#194A34] text-white px-4 py-2 rounded-full mt-4"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
