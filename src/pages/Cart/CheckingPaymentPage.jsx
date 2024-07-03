import { useCheckOrder } from "@/api/CheckoutApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CheckingPaymentPage = () => {
  const { id } = useParams();
  const { orderStatus, isLoadingOrderStatus, refetch } = useCheckOrder(id);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    let intervalId;

    const checkPaymentStatus = async () => {
      console.log("Checking payment status...");
      console.log("isLoadingOrderStatus:", isLoadingOrderStatus);
      console.log("orderStatus:", orderStatus);

      // Manually trigger a refetch
      await refetch();

      // Update status message if orderStatus is available
      if (!isLoadingOrderStatus && orderStatus) {
        setStatusMessage(orderStatus.message);

        // Check if payment is successful to stop refetching
        if (orderStatus.message !== "Payment pending") {
          clearInterval(intervalId); // Stop interval if payment status changes
        }
      }
    };

    // Initial check when component mounts
    checkPaymentStatus();

    // Set interval to check status every 5 seconds
    intervalId = setInterval(async () => {
      await checkPaymentStatus();
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [isLoadingOrderStatus, orderStatus, refetch]);

  console.log(statusMessage);

  return (
    <div>
      <h1>Checking Payment Status</h1>
      {isLoadingOrderStatus ? <p>Loading...</p> : <p>{statusMessage}</p>}
    </div>
  );
};

export default CheckingPaymentPage;
