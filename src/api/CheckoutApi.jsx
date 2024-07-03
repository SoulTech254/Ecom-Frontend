import { useMutation, useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetOrderSummary = () => {
  // Function to fetch order summary data asynchronously
  const getOrderSummary = async (data) => {
    console.log(data);
    // Sending a POST request to the specified API endpoint
    const response = await fetch(`${API_BASE_URL}/api/v1/checkout/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Parsing response data as JSON
    const responseData = await response.json();

    // If response is not OK (HTTP status not in the range 200-299),
    // throw an error with the error message from the response data
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // Return the parsed data
    return responseData;
  };

  // Destructuring the mutateAsync function and isLoading state from useMutation hook
  const { mutateAsync: getOrderSummaryData, isLoading: isLoadingOrderSummary } =
    useMutation(getOrderSummary);

  // Returning an object with getOrderSummaryData function and isLoadingOrderSummary state
  return { getOrderSummaryData, isLoadingOrderSummary };
};

export const usePlaceOrder = () => {
  // Function to place order asynchronously
  const placeOrderRequest = async (data) => {
    // Sending a POST request to the specified API endpoint
    const response = await fetch(
      `${API_BASE_URL}/api/v1/checkout/payment/mpesa`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData;
  };
  const { mutateAsync: placeOrder, isLoading: isLoadingPlaceOrder } =
    useMutation(placeOrderRequest);

  return { placeOrder, isLoadingPlaceOrder };
};

export const useCheckOrder = (orderId) => {
  const checkOrderRequest = async () => {
    // Sending a GET request to the specified API endpoint
    const response = await fetch(
      `${API_BASE_URL}/api/v1/checkout/payment/mpesa/processing/${orderId}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData; // Assuming responseData contains the order status
  };

  const {
    data: orderStatus,
    isLoading: isLoadingOrderStatus,
    error,
    refetch, // Add refetch function to manually trigger a refresh
  } = useQuery(
    ["checkOrder", orderId], // Unique key for the query
    checkOrderRequest, // The query function that fetches data
    {
      enabled: !!orderId, // Enable the query when orderId is truthy
      cacheTime: 0, // Disable caching
    }
  );

  return { orderStatus, isLoadingOrderStatus, error, refetch };
};
