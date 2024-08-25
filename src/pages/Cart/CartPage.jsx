import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "@/components/Counter";
import { toast } from "sonner";
import {
  addProductToCart,
  addToCartLocal,
  deleteProductFromCart,
} from "@/redux/cart/cartSlice";
import OrderSummary from "@/components/OrderSummary";
import { Trash2 } from "lucide-react";
import Stepper from "@/components/Stepper";
import { links, steps } from "@/config/cartConfig";
import { useNavigate } from "react-router-dom";
import EmptyCartMessage from "@/components/EmptyCartMessage";

const CartPage = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatedCart, setUpdatedCart] = useState({
    products: [],
    totalQuantity: 0,
    totalSavings: 0,
    totalAmount: 0,
  });
  console.log(updatedCart);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/cart/${user.cart}`
          );
          if (!response.ok) throw new Error("Failed to fetch cart");
          const cart = await response.json();
          setUpdatedCart(cart);
        } else {
          const localCart = JSON.parse(localStorage.getItem("cartItems")) || {
            products: [],
            totalQuantity: 0,
            totalAmount: 0,
            savings: 0,
          };
          setUpdatedCart(localCart);
        }
      } catch (error) {
        toast.error("Failed to load cart.");
      } finally {
        setIsCartLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const handleAddToCart = async (product, quantity) => {
    if (user) {
      // For authenticated users
      const updatedProduct = {
        productID: product._id,
        quantity: quantity, // Increase or decrease quantity
        method: "update", // Always "update" for authenticated users
      };

      try {
        await dispatch(addProductToCart(updatedProduct)).unwrap();
        await fetchCart(); // Refresh the cart after updating
      } catch (error) {
        console.error("Error updating cart for authenticated user:", error);
        toast.error("Failed to update product in cart.");
      }
    } else {
      // For non-authenticated users (local storage)
      dispatch(
        addToCartLocal({
          img: product.img,
          price: product.price,
          id: product._id,
          name: product.name,
          quantity: quantity, // Increase or decrease quantity
          discountPrice: product.discountPrice,
        })
      );
      // Refresh the cart from local storage
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || {
        products: [],
        totalQuantity: 0,
        totalAmount: 0,
        savings: 0,
      };
      setUpdatedCart(localCart);
    }
  };

  const handleDeleteProduct = (productID) => {
    const deleteProduct = {
      cartId: user ? user.cart : null,
      productId: productID,
    };

    dispatch(deleteProductFromCart(deleteProduct))
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
        {isCartLoading ? (
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
                          src={
                            item.product.images &&
                            item.product.images.length > 0
                              ? item.product.images[0]
                              : item.product.img
                          }
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
                          onMinusClick={() => handleAddToCart(item.product, -1)}
                          onPlusClick={() => handleAddToCart(item.product, 1)}
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
