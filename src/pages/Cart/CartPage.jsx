import React, { useEffect, useState } from "react";
import { useGetCart } from "@/api/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import Counter from "@/components/Counter";
import { toast } from "sonner";
import {
  addProductToCart,
  deleteProductFromCart,
} from "@/redux/cart/cartSlice";
import OrderSummary from "@/components/OrderSummary";
import { Trash2 } from "lucide-react";
import Stepper from "@/components/Stepper";
import { links, steps } from "@/config/cartConfig";

const CartPage = () => {
  const user = useSelector((state) => state.user.user);
  const { cart, isCartLoading } = useGetCart(user.cart);
  const [updatedCart, setUpdatedCart] = useState({
    products: [],
    totalQuantity: 0,
    totalAmount: 0,
  });
  const dispatch = useDispatch();
  console.log(updatedCart);

  useEffect(() => {
    if (cart) {
      setUpdatedCart(cart);
    }
  }, [cart]);

  const updateStatus = useSelector((state) => state.cart.status);
  console.log(updateStatus);

  const handleMinusClick = (productId) => {
    dispatch(addProductToCart({ productID: productId, quantity: -1 }))
      .unwrap()
      .then((newCart) => {
        setUpdatedCart(newCart);
      })
      .catch((error) => {
        toast.error("Failed to update product in cart.");
      });
  };

  const handlePlusClick = (productId) => {
    dispatch(addProductToCart({ productID: productId, quantity: 1 }))
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
        console.log(newCart);
        setUpdatedCart(newCart);
      })
      .catch((error) => {
        toast.error("Failed to delete product from cart.");
        console.error("Failed to delete product from cart:", error);
      });
  };

  const activeStep = 0;

  return (
    <div className="mt-20">
      <Stepper
        steps={steps}
        activeStep={activeStep}
        to={links}
        heading={"Checkout Process"}
      />
      <div className="mx-auto mt-8 ">
        {isCartLoading || updateStatus === "loading" ? (
          <div>Loading...</div>
        ) : (
          <div className="flex bg-transparent gap-10 ">
            <div className="flex-1">
              <table className=" w-[100%] border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-white">
                    <th className="py-2 px-4 font-semibold  text-left">
                      Product Details
                    </th>
                    <th className="py-2 px-4 "></th>
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
                  {updatedCart?.products?.map((item) => (
                    <tr key={item.product._id} className="bg-white">
                      <td className="py-2 px-4 ">
                        <img
                          className="h-[100px] w-[100px] object-cover"
                          src={item.product.images[0]}
                          alt="product image"
                        />
                      </td>
                      <td className="py-2 px-4  ">
                        <div className="capitalize">
                          {item.product.productName}
                        </div>
                        <div>{item.product.SKU}</div>
                      </td>
                      <td className="py-2 px-4 border-b ">
                        <Counter
                          itemCount={item.quantity}
                          onMinusClick={() =>
                            handleMinusClick(item.product._id)
                          }
                          onPlusClick={() => handlePlusClick(item.product._id)}
                        />
                      </td>
                      <td className="py-2 px-4 border-b ">
                        Ksh {item.product.price}
                      </td>
                      <td className="py-2 px-4 border-b flex-col relative">
                        <span>
                          Ksh {(item.quantity * item.product.price).toFixed(2)}
                        </span>
                        <Trash2
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
                savings={50}
                shippingFee={100}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
