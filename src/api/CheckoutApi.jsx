import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetOrderSummary = () => {
  // Function to fetch order summary data asynchronously
  const getOrderSummary = async (data) => {
    console.log(data)
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
