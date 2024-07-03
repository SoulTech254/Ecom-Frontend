import { useEffect, useState } from "react";
import { useGetOrderSummary, usePlaceOrder } from "@/api/CheckoutApi";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import Stepper from "@/components/Stepper";
import { links, steps } from "@/config/cartConfig";
import { useNavigate } from "react-router-dom";
import { mergeLocalCart } from "@/redux/cart/cartSlice";
// Import clearLocalCart action

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = user;
  const { deliveryInfo } = useSelector((state) => state.order);
  const { paymentInfo } = useSelector((state) => state.order);

  const { getOrderSummaryData, isLoadingOrderSummary } = useGetOrderSummary();
  const [orderSummary, setOrderSummary] = useState(null);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const { placeOrder, isLoadingPlaceOrder } = usePlaceOrder();
  const navigate = useNavigate();

  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          user: user._id,
          delivery: deliveryInfo,
          payment: paymentInfo,
          cart: cart,
        };

        const orderSummaryData = await getOrderSummaryData(data);
        setOrderSummary(orderSummaryData);
      } catch (error) {
        console.error("Error fetching order summary:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [getOrderSummaryData, user, deliveryInfo, paymentInfo, cart]);

  const handleProceedToPay = async () => {
    try {
      const payment = await placeOrder(orderSummary);
      console.log(payment);
      navigate(`/checking-payment/${payment._id}`);

      // Clear local cart state after placing order
      dispatch(mergeLocalCart()); // Dispatch the action to clear local cart
    } catch (error) {
      console.error("Error placing order:", error);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-2">
      <Stepper
        steps={steps}
        doneSteps={[0, 1, 2]}
        activeStep={2}
        to={links}
        heading={"Checkout Process"}
      />
      <h2 className="text-3xl font-bold mb-2 text-center mt-2">
        Order Summary
      </h2>
      {isLoadingOrderSummary && (
        <p className="text-gray-600 text-center">Loading order summary...</p>
      )}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {orderSummary && (
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <div className="mb-4">
                <p className="font-semibold text-lg mb-2">User Details</p>
                <p className="text-gray-700">Name: {orderSummary.user.name}</p>
                <p className="text-gray-700">
                  Email: {orderSummary.user.email}
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-lg mb-2">Delivery Address</p>
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
            </div>
            <div>
              <div className="mb-4">
                <p className="font-semibold text-lg mb-2">Delivery Method</p>
                <p className="text-gray-700 capitalize">
                  Method: {orderSummary.deliveryMethod}
                </p>
                <p className="text-gray-700">
                  Delivery Slot: {orderSummary.deliverySlot}
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-lg mb-2">Payment Details</p>
                <p className="text-gray-700 capitalize">
                  Method: {orderSummary.paymentMethod}
                </p>
                <p className="text-gray-700">
                  Account: {orderSummary.paymentMethod == "mpesa" && "+254 "}
                  {orderSummary.paymentAccount}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <p className="font-semibold text-lg mb-2">Products</p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
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
          <div className="mb-6">
            <p className="font-semibold text-lg mb-2">Order Summary</p>
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
          <div className="flex justify-center">
            <button
              className="bg-[#194A34] text-white py-2 px-4 rounded-full"
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
