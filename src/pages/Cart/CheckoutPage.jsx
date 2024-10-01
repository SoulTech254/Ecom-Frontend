import { useEffect, useState } from "react";
import { useGetOrderSummary, usePlaceOrder } from "@/api/CheckoutApi";
import { useSelector, useDispatch } from "react-redux";
import Stepper from "@/components/Stepper";
import { links, steps } from "@/config/cartConfig";
import { useNavigate } from "react-router-dom";
import { mergeLocalCart } from "@/redux/cart/cartSlice";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = user;
  const { deliveryInfo } = useSelector((state) => state.order);
  const { paymentInfo } = useSelector((state) => state.order);
  const { selectedBranch } = useSelector((state) => state.branch);
  const cartP = useSelector((state) => state.cart);

  console.log(deliveryInfo);
  console.log(paymentInfo);

  const { getOrderSummaryData, isLoadingOrderSummary } = useGetOrderSummary();
  const [orderSummary, setOrderSummary] = useState(null);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const { placeOrder, isLoadingPlaceOrder } = usePlaceOrder();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    if (Object.keys(deliveryInfo).length === 0) {
      navigate("/address");
      toast.error("Fill in Delivery Details First");
    }
    if (cartP.products.length === 0) {
      navigate("/cart");
      toast.error("Add items to Cart First");
    }
    if (Object.keys(paymentInfo).length === 0) {
      navigate("/payment");
      toast.error("Fill in Payment Details First");
    }
  }, [deliveryInfo, cartP, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          user: user._id,
          delivery: deliveryInfo,
          payment: paymentInfo,
          cart: cart,
          branch: selectedBranch.id,
        };

        const orderSummaryData = await getOrderSummaryData(data);
        setOrderSummary(orderSummaryData);
      } catch (error) {
        console.error("Error fetching order summary:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [
    getOrderSummaryData,
    user,
    deliveryInfo,
    paymentInfo,
    cart,
    selectedBranch,
  ]);

  const handleProceedToPay = async () => {
    try {
      const payment = await placeOrder(orderSummary);
      console.log(payment);
      navigate(`/checking-payment/${payment._id}`);
      dispatch(mergeLocalCart());
    } catch (error) {
      console.error("Error placing order:", error);
      setError(error.message);
    }
  };

  const formatDeliverySlot = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const doneSteps = [];
  if (Object.keys(deliveryInfo).length > 0) {
    doneSteps.push(1);
  }
  if (Object.keys(paymentInfo).length > 0) {
    doneSteps.push(2);
  }
  if (cartP.products.length > 0) {
    doneSteps.push(0);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-2">
      <Stepper
        steps={steps}
        doneSteps={doneSteps}
        activeStep={2}
        to={links}
        heading={"Checkout Process"}
      />
      <h2 className="text-3xl font-bold mb-4 text-center mt-4">
        Order Summary
      </h2>

      {isLoadingOrderSummary && (
        <p className="text-gray-600 text-center">Loading order summary...</p>
      )}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {orderSummary && (
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User Details Section */}
            <div className="border p-4 rounded-md">
              <h3 className="font-semibold text-lg mb-2">User Details</h3>
              <p className="text-gray-700">Name: {orderSummary.user.name}</p>
              <p className="text-gray-700">Email: {orderSummary.user.email}</p>
            </div>

            {/* Delivery Address Section */}
            {orderSummary.deliveryMethod !== "pick-up" && (
              <div className="border p-4 rounded-md">
                <h3 className="font-semibold text-lg mb-2">Delivery Address</h3>
                <p className="text-gray-700">
                  Building: {orderSummary.deliveryAddress.building}
                </p>
                <p className="text-gray-700">
                  City: {orderSummary.deliveryAddress.city}
                </p>
                <p className="text-gray-700">
                  Contact Number: +254{" "}
                  {orderSummary.deliveryAddress.contactNumber}
                </p>
                <p className="text-gray-700">
                  Instructions: {orderSummary.deliveryAddress.instructions}
                </p>
              </div>
            )}

            {/* Delivery Method Section */}
            <div className="border p-4 rounded-md">
              <h3 className="font-semibold text-lg mb-2">Delivery Method</h3>
              <p className="text-gray-700 capitalize">
                Method: {orderSummary.deliveryMethod}
              </p>
              <p className="text-gray-700">
                Delivery Slot:{" "}
                {orderSummary.deliveryMethod === "express"
                  ? "30 minutes after payment"
                  : formatDeliverySlot(orderSummary.deliverySlot)}
              </p>
            </div>

            {/* Payment Details Section */}
            <div className="border p-4 rounded-md">
              <h3 className="font-semibold text-lg mb-2">Payment Details</h3>
              <p className="text-gray-700 capitalize">
                Method: {orderSummary.paymentMethod}
              </p>
              <p className="text-gray-700">
                Account: {orderSummary.paymentMethod === "mpesa" && "+254 "}{" "}
                {orderSummary.paymentAccount}
              </p>
            </div>
          </div>

          {/* Products Table Section */}
          <div className="mt-6 border p-4 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Products</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderSummary.products
                    .slice(0, showAll ? orderSummary.products.length : 5)
                    .map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={product.image} // Assuming product has an image property
                            alt={product.name}
                            className="h-16 w-16 object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {product.quantity}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            Ksh {product.price}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            Ksh {product.subtotal}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {orderSummary.products.length > 5 && (
                <div className="mt-2 flex justify-start">
                  <button
                    className="text-[#E61927] text-sm font-semibold"
                    onClick={toggleShowAll}
                  >
                    {showAll ? "View Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="mt-6 border p-4 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
            <p className="text-gray-700">
              Total Quantity: {orderSummary.totalQuantity}
            </p>
            <p className="text-gray-700">
              Original Amount: Ksh {orderSummary.originalAmount}
            </p>
            <p className="text-gray-700">
              Savings: Ksh {orderSummary.totalSavings}
            </p>
            <p className="text-gray-700">
              Total Amount: Ksh {orderSummary.totalAmount}
            </p>
          </div>

          {/* Proceed to Pay Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-primary text-white py-2 px-4 rounded-full"
              onClick={handleProceedToPay}
              disabled={isLoadingPlaceOrder}
            >
              {isLoadingPlaceOrder ? "Processing..." : "Proceed To Pay"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
