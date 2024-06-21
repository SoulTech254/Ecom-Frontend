import { useEffect, useState } from "react";
import { useGetOrderSummary } from "@/api/CheckoutApi";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = user;
  const { deliveryInfo } = useSelector((state) => state.order);
  console.log(deliveryInfo);
  const { paymentInfo } = useSelector((state) => state.order);
  console.log(paymentInfo)

  const { getOrderSummaryData, isLoadingOrderSummary } = useGetOrderSummary();
  const [orderSummary, setOrderSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Prepare data object to send to getOrderSummary
        const data = {
          user: user._id,
          delivery: deliveryInfo,
          payment: paymentInfo,
          cart: cart,
        };

        // Call getOrderSummaryData to fetch order summary
        const orderSummaryData = await getOrderSummaryData(data);

        // Set order summary state
        setOrderSummary(orderSummaryData);
      } catch (error) {
        console.error("Error fetching order summary:", error);
        // Set error state
        setError(error.message);
      }
    };

    fetchData();
  }, [getOrderSummaryData, user, deliveryInfo, paymentInfo, cart]);

  return (
    <div>
      <h2>Order Summary</h2>
      {isLoadingOrderSummary ? (
        <p>Loading order summary...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : orderSummary ? (
        <div>
          <p>User: {orderSummary.user.name}</p>
          <p>Email: {orderSummary.user.email}</p>
          <h3>Delivery Address</h3>
          <p>Address: {orderSummary.deliveryAddress.address}</p>
          <p>Contact Number: {orderSummary.deliveryAddress.contactNumber}</p>
          <p>Instructions: {orderSummary.deliveryAddress.instructions}</p>
          <h3>Delivery Method</h3>
          <p>Method: {orderSummary.deliveryMethod}</p>
          <p>Delivery Slot: {orderSummary.deliverySlot}</p>
          <h3>Products</h3>
          <ul>
            {orderSummary.products.map((product) => (
              <li key={product.id}>
                {product.name} - Quantity: {product.quantity} - Price: $
                {product.price} - Subtotal: ${product.subtotal}
              </li>
            ))}
          </ul>
          <p>Total Quantity: {orderSummary.totalQuantity}</p>
          <p>Total Amount: ${orderSummary.totalAmount}</p>
          <h3>Payment Details</h3>
          <p>Method: {orderSummary.paymentMethod}</p>
          <p>Account: {orderSummary.paymentAccount}</p>
        </div>
      ) : null}
    </div>
  );
};

export default CheckoutPage;
